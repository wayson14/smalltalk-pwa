import {React, useState, useEffect, useContext} from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { UserContext } from '../services/UserContext';
const Chat = () => {

  const [message, setMessage] = useState('');
  const [count,setCount] = useState(0);
  // const [username, setUsername] = useState('asdf');
  const [messagesArray, setMessagesArray] = useState([{
    username: "Bóg",
    message: "Łona, co tam się dzieje?"
  },
  {
    username: "Bóg",
    message: "Święty Piotr wybrał losowo Twój numer Ja tu nic nie widzę z góry, bo mi zasłaniają chmury Widoczność licha, więc przestań pieprzyć, mów co słychać!"
  },
  // {
  //   username: "Łona",
  //   message: "Aaa... kicha, każdy bezimienny Wszędzie jak nie wojna, to przynajmniej stan wojenny Władza to banda cwaniaków z największym na czele A Biblia dawno już przestała być bestsellerem"
  // },
  // {
  //   username: "Bóg",
  //   message: "Hmmm, to może jeszcze raz Mesjasza ześlę?"
  // },
  // {
  //   username: "Łona",
  //   message: "Nie wygłupiaj się, skończy na elektrycznym krześle!"
  // },
  // {
  //   username: "Łona",
  //   message: "Nie warto, szkoda czasu, ludziom w głowach się przewraca Jest już za późno, by nawracać"
  // }

]);



  const [room, setRoom] = useState(0);
  const { user, setUser } = useContext(UserContext);
  const [moreInfoTrigger, setMoreInfoTrigger] = useState(false);

  let renderChat = 1;

  const chatEndpoint = process.env.REACT_APP_CHAT_URL;
  const url = `${chatEndpoint}/${room}/`
  const client = new W3CWebSocket(url);
  const [connectionStatus, setConnectionStatus] = useState(false);



  const sendMessage = (e, mes) => {
    console.log(mes);
    client.send(JSON.stringify({
      type: "message",
      message: message,
      username: user.username,
      sendTime: new Date()
    }));
    setMessage(message => '')
  }

  const revealUser = () =>{
    return true;
  }
  const rejectUser = () =>{
    return true;
  }
  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
      setConnectionStatus(true);
    }

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      setMessagesArray(messagesArray => [...messagesArray, dataFromServer]);
      setCount(count => count+1);
    }

    client.onclose = () => {
      console.log('WebSocket Client Disconnected');
      setConnectionStatus(false);
    }

    // w przyszłości
    // setUsername(getUsername())

  }, [])

  useEffect(() => {
    console.log(messagesArray);
  }, [messagesArray])
  // useEffect(() => {
  //   console.log(user);
  // }, [moreInfoTrigger])

  return (
      <div className="Chat" onKeyUp={e => (e.key === 'Enter' && sendMessage(e,message))}>
        {/* {messagesArray.map(message => {
            <span>{message.message}: </span>
        })} */}
        <h2>chat nr {user.roomID}</h2>
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
            
          </div>})
        }</div>
        <div className="input-section">
          <input className="input-chat" type="text" onChange={e => setMessage(e.target.value)}></input>
          <button onClick={e => sendMessage(e,message)}>send</button>
        </div>
      </div>)
};

export default Chat;
