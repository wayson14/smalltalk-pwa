import { React, useState, useEffect, useRef, useContext } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { request, chatApiUrl } from '../services/client'
import { getRoomMessages, closeSession, leaveWaitingroom } from '../services/api_methods'
import { UserContext } from '../services/UserContext';
import useAsyncState from '../services/useAsyncState';
import ChatEndView from './ChatEndView';

const Chat = () => {

  const { user, setUser } = useContext(UserContext);
  const [contactUser, setContactUser] = useAsyncState(null);

  const client = useRef();
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0);
  const [room, setRoom] = useState(0);

  const [ifWanting, setIfWanting] = useAsyncState(false); //wanting to reveal
  const [ifWantToReject, setIfWantToReject] = useAsyncState(false);
  const [ifRevealed, setIfRevealed] = useAsyncState(false);
  const [ifRejected, setIfRejected] = useAsyncState(false);

  const [messagesArray, setMessagesArray] = useState([{
    username: "Bóg",
    message: "Łona, co tam się dzieje?"
  },
  {
    username: "Bóg",
    message: "Święty Piotr wybrał losowo Twój numer Ja tu nic nie widzę z góry, bo mi zasłaniają chmury Widoczność licha, więc przestań pieprzyć, mów co słychać!"
  },
  ]);


  const [moreInfoTrigger, setMoreInfoTrigger] = useState(false);

  const contact = '';
  const debug = process.env.REACT_APP_DEBUG;
  const chatEndpoint = process.env.REACT_APP_CHAT_URL;
  const url = `${chatEndpoint}/${user.roomID}/`
  // const url = `${chatEndpoint}/${room}/`
  const [connectionStatus, setConnectionStatus] = useState(false);

  const getMessageContent = (message) => {
    return
  }
  
  useEffect(() => {
    getRoomMessages()
    .then(data => setMessagesArray(data?.content))
    .catch(err => console.error(err))
    client.current = new WebSocket(url)

    client.current.onopen = () => {
      console.log('WebSocket Client Connected');
      setConnectionStatus(true);
    }

    client.current.onmessage = (message) => {
      const mes = JSON.parse(message.data);
      if (mes?.message.indexOf('#') === 0) {
        const code = mes.message.slice(1, 4);
        
        setContactUser(mes.message.slice(4, mes.message.length))
        console.log(code);

        if (code === '000') {
          console.log(`Normal text message.`)
        }
        else if (code === '001') {
          console.log(`${mes.username} wants to reveal.`)
        }
        else if (code === '002') {
          console.log(`${mes}`)
          setIfRevealed(true)
        }
        // else if (code === '003') {
        //   console.log(`${mes.username} rejects relationship.`);
        //   setIfRejected(true);
        // }
        else if (code === '006') {
          console.log(`${mes.username} rejects relationship.`);
          setIfRejected(true);
        }
      }
      // var img = '../../public';
      const notification = new Notification(`${mes.username} napisał: `, { body: `${mes.message}`});
      setMessagesArray(messagesArray => [...messagesArray, mes]);
      setCount(count => count + 1);
    }

    client.current.onclose = () => {
      console.log('WebSocket Client Disconnected');
      setConnectionStatus(false);
    }

    client.current.onerror = (e) => {
      console.log('Error' + e.code);
    }

    // w przyszłości
    // setUsername(getUsername())
    return () => {
      client.current.close();
    }
  }, [])

  const revealUser = () => {
    setIfWanting(ifWantint => !ifWanting)
      .then(currentState => {
        console.log(currentState)
        return new Promise ((resolve, reject) => {
          let messageInfo =  `${(currentState ? '#001' : '#005')} user of id: ${user.id} ${(currentState ? 'wants' : 'doesn\'t want to')} to reveal`
          try{
            client.current.send(JSON.stringify({
              type: "message",
              message: messageInfo,
              username: user.username,
              sendTime: new Date()
          })
          )
        } catch (error) {
          reject(error)
        }
          resolve(messageInfo)
      })
    })
    .then(data => {
      console.log(data)
    })
    // })
    // .then(res => {
    //   console.log(res)
    //   return leaveWaitingroom()
    // })
    // .then(res => {
    //   console.log(res)
    //   setIfRevealed(true)
    //   return 
    // })
    .catch(err => console.error(err))
}

  
const rejectUser = () => {
  setIfWantToReject(ifWantToReject => !ifWantToReject)
    .then(currentState => {
      console.log(currentState)
      return new Promise((resolve, reject) => {
        let messageInfo = `#003 user of id: ${user.id} ${(currentState ? 'wants' : 'doesn\'t want to')} to reject`
        try {
          client.current.send(JSON.stringify({
            type: "message",
            message: messageInfo,
            username: user.username,
            sendTime: new Date()
          })
          )
        } catch (error) {
          reject(error)
        }
        resolve(messageInfo)
      })
    })
    // .then(data => {
    //   console.log(data)
    //   return closeSession()
    // })
    // .then(res => {
    //   console.log(res)
    //   return leaveWaitingroom()
    // })
    // .then(res => {
    //   console.log(res)
    //   setIfRejected(true)
    //   return
    // })
    .catch(err => console.error(err))
}

      
  //      

  // }

  const sendRevealSignal = () => {
    client.current.send(JSON.stringify({
      type: "message",
      message: `#002 https://wp.pl`,
      username: 'server',
      sendTime: new Date()
      //user object powinien tu być
    }));
  }

  const sendMessage = (e, mes) => {
    console.log(mes, user.username);
    client.current.send(JSON.stringify({
      // type: "message",
      message: message,
      username: user.username,
      // sendTime: new Date()
    }));
    setMessage(message => '')
  }

  

  useEffect(() => {
    console.log(messagesArray);
  }, [messagesArray])
  // useEffect(() => {
  //   console.log(user);
  // }, [moreInfoTrigger])


  return (
    <div className="Chat" onKeyUp={e => (e.key === 'Enter' && sendMessage(e, message))}>
      {/* {messagesArray.map(message => {
            <span>{message.message}: </span>
        })} */}
      {ifRevealed && <ChatEndView contactUser={contactUser} type='reveal'></ChatEndView>}
      {ifRejected && <ChatEndView type='reject'></ChatEndView>}
      <h2>chat nr {user.roomID}</h2>
      {{ debug } && <div>
        <button onClick={() => sendRevealSignal()}>send reveal signal</button>
      </div>}
      <button onClick={() => revealUser()}>reveal</button>
      <button onClick={() => rejectUser()}>reject</button>
      <div className="messages-array">{messagesArray.map(mes => {
        return <div className="message-body" onClick={(e) => {
          setMoreInfoTrigger(!moreInfoTrigger);
        }}>
          <div className="message-sender">
            {mes?.username + ": "}
          </div>
          <div className="message-content">
            {mes?.message}
          </div>

        </div>
      })
      }</div>
      <div className="input-section">
        <input className="input-chat" value={message} type="text" onChange={e => setMessage(e.target.value)}></input>
        <button onClick={e => {
          setMessage('');
          sendMessage(e, message);
        }}>send</button>
      </div>
    </div>)
};

export default Chat;
