// #TODO: problem zamykania poprawnego sesji, użytkownik jeżęli nie opuście samodzielnie sesji to może wejść do niej z powrotem

import { React, useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { request, chatApiUrl } from '../services/client'
import { getRoomMessages, closeSession, leaveWaitingroom } from '../services/api_methods'
import { UserContext } from '../services/UserContext';
import ScrollToBottom, {useAtBottom} from 'react-scroll-to-bottom';
import useAsyncState from '../services/useAsyncState';
import ChatEndView from './ChatEndView';
import PopUp from './PopUp';
import iceLogo from './loginIcon/Ice.svg';
import sendLogo from './loginIcon/sendArrow.svg';
import XLogo from './loginIcon/X.svg';
import X2Logo from './loginIcon/X 2.svg';
import checkLogo from './loginIcon/check.svg';
import fbLogo from './loginIcon/fb.svg';
import instLogo from './loginIcon/instagram.svg';
import userLogo from './loginIcon/Avatar.svg';
import useScrollToEnd from 'react-scroll-to-bottom/lib/hooks/useScrollToEnd';
import PopUpBase from './PopUpBase'
const Chat = () => {
  const navigate = useNavigate();
  const el = document.getElementById('messages-array');
  if (el) {
    el.scrollTop = el.scrollHeight;
  }

  const { user, setUser } = useContext(UserContext);
  const [contactUser, setContactUser] = useAsyncState(null);
  const [ revealObject, setRevealObject ] = useState({});

  const client = useRef();
  const [message, setMessage] = useState('');

  const [ifWanting, setIfWanting] = useAsyncState(false); //wanting to reveal #TODO: zrobić funkcję, która będzie pobierała stan reveal z servera
  const [ifWantToReject, setIfWantToReject] = useAsyncState(false);
  const [ifRevealed, setIfRevealed] = useAsyncState(false);
  const [ifRejected, setIfRejected] = useAsyncState(false);

  const [enemyUsername, setEnemyUsername] = useState('someone');

  const [showRevealPanel, setShowRevealPanel] = useState(false);


  const [showRejectChoice, setShowRejectChoice] = useState(false);
  const [showRevealChoice, setShowRevealChoice] = useState(false);


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
  const [connectionStatus, setConnectionStatus] = useState(false);

  const getMessageContent = (message) => {
    return
  }

  function parseRevealMessage(input){
    //#TODO: to zrobić regexem, bo aż wstyd 
    // let revealObject = {}
    let data = input
    const words = data.split(' ').slice(0, data.length);
    
    let good_words = words.filter((w) => {
      return w[0] === 'u' || 's' //username & social_link (database props)
    }) 
    let pairs =  good_words.map(p => {
      return p.split(':').slice()
    })
    pairs.shift()
    console.log(pairs)
    //#TODO: Zrobić to za pomocą array funcs
    let obj = {
      [pairs[0][0]]: pairs[0][1],
      [pairs[1][0]]: pairs[1][1],
      [pairs[2][0]]: pairs[2][1],
      [pairs[3][0]]: pairs[3][1],
      // [pairs[4][0]]: pairs[4][1],
    }
    return obj
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
      // console.log("MESSAGE: ", message)
      const mes = JSON.parse(message.data);
      if (mes?.message.indexOf('#') === 0) {
        const code = mes.message.slice(1, 4);

        setContactUser(mes.message.slice(4, mes.message.length))
        console.log(code);

        if (code === '000') {
          console.log(`Normal text message.`)
        }
        else if (code === '001') {
          // console.log(`${mes.username} wants to reveal.`)
        }
        else if (code === '002') {
          // console.log(`${mes}`)
          console.log('message: ', mes.message)
          setRevealObject(parseRevealMessage(mes.message))
          // console.log("CONTENT:", revealObject)
          setIfRevealed(true)
        }
        // else if (code === '003') {
        //   console.log(`${mes.username} rejects relationship.`);
        //   setIfRejected(true);
        // }
        else if (code === '006') {
          // console.log(`${mes.username} rejects relationship.`);
          setIfRejected(true);
        }
      }
      // var img = '../../public';
      const notification = new Notification(`${mes.username} napisał: `, { body: `${mes.message}`});
      setMessagesArray(messagesArray => [...messagesArray, mes]);
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
          let messageInfo =  `${(currentState ? '#001' : '#005')} user of id: ${user.username} ${(currentState ? 'wants' : 'doesn\'t want to')} to reveal`
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
    // .then(data => {
    //   console.log(data)
    // })
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
  // setShow(false)

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
    setShowRevealPanel(true)
    client.current.send(JSON.stringify({
      type: "message",
      message: `#002 https://wp.pl`,
      username: 'server',
      sendTime: new Date()
      //user object powinien tu być
    }));
  }

  const sendMessage = (e, mes) => {
    // console.log(mes, user.username);
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


  const [ style, setStyle ] = useState('blue');
  const giveColor = (messagess,etc)=>{
    if(messagess == user.username){
     return <div className="message-body-my"><div className='my-message'>{etc?.message}</div></div>
    }
    else{
      return <div className="message-body-enemy"><div className='enemy-message'>{etc?.message}</div></div>
    }
  }

  return (
    // <div onClick={(e) => {e.target.id === 'nieodda'  && setShow3(false)}}>
    // <div onClick={(e) => {e.target.id === 'ree'  && setShow3(true)}}>
    // <div onClick={(e) => {e.target.id === 'odda'  && setShowRevealPanel(false)}}>
    <div className="Chat-view"  onKeyUp={e => (e.key === 'Enter' && sendMessage(e, message))}>
      {/* {messagesArray.map(message => {
            <span>{message.message}: </span>
        })} */}

      {/* <h2>chat nr {user.roomID}</h2> */}
      {/* #TODO: dodać topbar taki jak w figmie */}
      <div className="top-chat-bar">
        <button className="action-button" onClick={() => setShowRevealChoice(true)}>{ifWanting ? "Zrezygnuj" : "Odkryj"}</button>
        <h4>{enemyUsername}</h4>
        <button className="action-button" onClick={() => navigate("/")}>Menu</button>
      </div>
      {/* <button onClick={() => revealUser()}>reveal</button>
      <button onClick={() => rejectUser()}>reject</button> */}
      <div className='chatFlip chat-body'>
        {/* <div   */}
        {/* // id='messages-array' className="messages-array"> */}
        {messagesArray.map(mes => {
          return <div className="message-body" onClick={(e) => {
            console.log(mes)
            setMoreInfoTrigger(!moreInfoTrigger);
          }}>

              {giveColor(mes?.username,mes)}


          </div>
        })
        }
        </div>
      <div className="input-chat bottom-bar">
        <img className='xLogo chat-icon' src={XLogo} alt=""  onClick={() => setShowRejectChoice(true)}/>
        <div className='send-message'>
          <input placeholder='Napisz coś...' value={message} maxlength="255" type="text" onChange={e => setMessage(e.target.value)}></input>
          <button onClick={e => {
            setMessage('');
            sendMessage(e, message);
          }}><img src={sendLogo}/></button>
        </div>
        <img className='iceBraker chat-icon' src={iceLogo} alt="" />
      </div>
      {showRevealPanel && <PopUp show={showRevealPanel} setShow={setShowRevealPanel} head2={"Druga osoba chce cię poznać"} clas={'chatBttns'} funCtion1={revealUser} />}


      {showRevealChoice && <PopUpBase type="choice" prompt={!ifWanting ? "Czy na pewno chcesz się poznać?" : "Czy na pewno chcesz anulować?"} onNo={() => setShowRevealChoice(false)} onYes={revealUser} handleClose={() => setShowRevealChoice(false)}>
        <div>reveal?</div>
      </PopUpBase>}

      {showRejectChoice && <PopUpBase type="choice" prompt="Czy na pewno chcesz się rozłączyć?" onNo={() => setShowRejectChoice(false)} onYes={rejectUser} handleClose={() => setShowRejectChoice(false)}>
          <div>reject?</div>
        </PopUpBase>}

      {/* {ifRevealed && <ChatEndView contactUser={contactUser} type='reveal'></ChatEndView>} */}

      {/* {ifRejected && <ChatEndView type='reject'></ChatEndView>} */}
      {ifRejected && <PopUpBase type='rejected-view'/>}
      {ifRevealed && <PopUpBase type='revealed-view' revealObject={revealObject}/>}
      {/* {show3 && <PopUp show3={show3} setShow3={setShow3} avatar={userLogo} head1={"Szymon"} imagine3={fbLogo} imagine4={instLogo} instaInfo={"Szymon Kowal"} fbInfo={"Szymon Kowal"} clas={'profile contentt'}/>} */}
    </div>
    // </div>
    // </div>
    // </div>
    )
};

export default Chat;
