import {React, useState, useEffect, useContext} from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { UserContext } from '../services/UserContext';
const Chat = () => {

  const [message, setMessage] = useState('');
  const [count,setCount] = useState(0);
  // const [username, setUsername] = useState('asdf');
  const [messagesArray, setMessagesArray] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [room, setRoom] = useState(1);

  const { user, setUser } = useContext(UserContext);

  let renderChat = 1;

  const url = `ws://127.0.0.1:8000/ws/chat/${room}/`
  const client = new W3CWebSocket(url);

  const sendMessage = (e, mes) => {
    client.send(JSON.stringify({
      type: "message",
      message: message,
      username: user.username
    }));
  }
  
  // const useStyles = theme => ({
  //   paper: {
  //     marginTop: theme.spacing(8),
  //   },
  //   avatar: {
  //     margin: theme.spacing(1),
  //     backgroundColor: theme.palette.secondary.main,
  //   }
  // })
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

  return (
      <div className="Chat">
        {/* {messagesArray.map(message => {
            <span>{message.message}: </span>
        })} */}
        <div className="messages-array">{messagesArray.map(mes => {
          return <div className="message-body">
            <div className="message-sender">
              {mes?.username + ": "} 
            </div>
            <div className="message-content">
              {mes?.message}
            </div>
          </div>})
        }</div>
        <div className="input-section">
          <input type="text" onChange={e => setMessage(e.target.value)}></input>
          <button onClick={e => sendMessage(e,message)}>send</button>
        </div>
      </div>)
};

export default Chat;
