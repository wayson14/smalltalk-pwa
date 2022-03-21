// #TODO: problem zamykania poprawnego sesji, użytkownik jeżęli nie opuście samodzielnie sesji to może wejść do niej z powrotem
import useSound from 'use-sound';
import { React, useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { request, chatApiUrl } from '../services/client'
import { getRoomMessages, getIcebreaker, closeSession, leaveWaitingroom } from '../services/api_methods'
import { UserContext } from '../services/UserContext';
import { InfoContext } from '../services/InfoContext';
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
import PopUpBase from './PopUpBase'

import sweden from '../media/Sweden.mp3'
import icebreakSound from '../media/Glass_dig1.mp3'

const Chat = () => {
  const navigate = useNavigate();
  const el = document.getElementById('messages-array');
  // if (el) {
  //   el.scrollTop = el.scrollHeight;
  // }
  const [playSweden] = useSound(sweden);
  const { user, setUser } = useContext(UserContext);
  const { info, setInfo } = useContext(InfoContext);

  const [playIcebreak] = useSound(icebreakSound);

  const client = useRef();
  const scrollBody = useRef();
  const [message, setMessage] = useState('');

  const [ifWanting, setIfWanting] = useAsyncState(false); //wanting to reveal #TODO: zrobić funkcję, która będzie pobierała stan reveal z servera
  const [ifWantToReject, setIfWantToReject] = useAsyncState(false);
  const [ifRevealed, setIfRevealed] = useAsyncState(false);
  const [ifRejected, setIfRejected] = useAsyncState(false);
  const [cooldown, setCooldown] = useState(false)

  
  const [enemyUsername, setEnemyUsername] = useState();

  const [showRevealPanel, setShowRevealPanel] = useState(false);

  const [showRejectChoice, setShowRejectChoice] = useState(false);
  const [showRevealChoice, setShowRevealChoice] = useState(false);

  const [contactUser, setContactUser] = useAsyncState(null);
  const [revealObject, setRevealObject] = useState({});

  const [scrollDown, setScrollDown] = useState(false)
  const [connectionAttempts, setConnectionAttempts] = useState(0);


  const [messagesArray, setMessagesArray] = useState([{
    username: "Bóg",
    message: "Łona, co tam się dzieje?"
  },
  {
    username: "Bóg",
    message: "Święty Piotr wybrał losowo Twój numer Ja tu nic nie widzę z góry, bo mi zasłaniają chmury Widoczność licha, więc przestań pieprzyć, mów co słychać!"
  },
  ]);

  const [icebreakersArray, setIcebreakersArray] = useState([
    'Lubisz Bounty?',
    'Słuchasz Mandaryny?',
    'Jesteś przyjacielem Piaska?'
  ]);


  const [moreInfoTrigger, setMoreInfoTrigger] = useState(false);

  const contact = '';
  const debug = process.env.REACT_APP_DEBUG;
  const chatEndpoint = process.env.REACT_APP_CHAT_URL;
  const url = `${chatEndpoint}/${user.roomID}/`
  const [connectionStatus, setConnectionStatus] = useState(false);

  

  function parseRevealMessage(input) {
    //#TODO: to zrobić regexem, bo aż wstyd 
    // let revealObject = {}
    let data = input
    const words = data.split(' ').slice(0, data.length);

    let good_words = words.filter((w) => {
      return w[0] === 'u' || 's' //username & social_link (database props)
    })
    let pairs = good_words.map(p => {
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

      .then(data => {
        // console.log(data)
        setMessagesArray(data.content)
      })
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
        const content = mes.message.slice(4, mes.message.length)
        setContactUser(mes.message.slice(4, mes.message.length))
        // console.log(code);

        if (code === '000') {
          // console.log(`Normal text message.`)
        }
        else if (code === '001') {
          // console.log(`${mes.username} wants to reveal.`)
        }
        else if (code === '002') {
          // console.log(`${mes}`)
          // console.log('message: ', mes.message)
          
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

        else if (code === '007') {
          // mes.message = content
          // console.log(`${mes.username} rejects relationship.`);
        }
        else if (code === '008') {
          // mes.message = content
          // console.log(`${mes.username} rejects relationship.`);
        }
      }
      // var img = '../../public';
      // ServiceWorkerRegistration.showNotification(`Nowa wiadomość!: `, { body: `${mes.message}` })
      var ua = navigator.userAgent.toLowerCase();

      var isDesktop = !(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(ua)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0,4)));
      
      if (isDesktop){
        const notification = new Notification(`Nowa wiadomość!: `, { body: `${mes.message}` });
      }
      setMessagesArray(messagesArray => [...messagesArray, mes]);
    }


    client.current.onclose = () => {
      console.log('WebSocket Client Disconnected');
      
      setConnectionStatus(false);
      navigate('/')
    }

    client.current.onerror = (e) => {
      // console.log(e)
      console.log('Występił błąd, próba ponownego połączenia...');
      setInfo({
        text: 'Problem z połączeniem, spróbuj wyjść i wejść jeszcze raz.',
        type: 'error'
      })
      client.current.close()
      // setConnectionAttempts(connectionAttempts++)
      // if (connectionAttempts < 3){
      //   client.current = new WebSocket(url)
      // }
      // else{
      //   setInfo({
      //     type: 'error',
      //     text: 'Błąd przy połączeniu'
      //   })
      //   navigate('')
      // }
      
    }

    // w przyszłości
    // setUsername(getUsername())
    return () => {
      client.current.close();
    }
  }, [])

  function sendIcebreaker(){
    if (!cooldown){
      getIcebreaker().then(icebreaker =>
      client.current.send(JSON.stringify({
        type: "message",
        message: `#008 ${icebreaker}`,
        username: user.username,
        sendTime: new Date()
      }))
      ).then(() => playIcebreak())
      .then(() => setCooldown(true))
      .then(() => setTimeout(() => setCooldown(false), 120000))}
    else {
      setInfo({
        text: `Możesz użyć IceBreakera co 120 sekund.`,
        type: 'info'
      })
    }
  }
  const revealUser = () => {
    setIfWanting(ifWantint => !ifWanting)
      .then(currentState => {
        // console.log(currentState)
        return new Promise((resolve, reject) => {
          let messageInfo = `${(currentState ? '#001' : '#005')} Ktoś ${(currentState ? 'chce' : 'nie chce')} się ujawnić`
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
        // console.log(currentState)
        return new Promise((resolve, reject) => {
          let messageInfo = `#003 Ktoś ${(currentState ? 'chce' : 'nie chce')} odrzucenia`
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

      .catch(err => console.error(err))
  }




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
    e.preventDefault()
    // console.log(mes, user.username);
    // console.log(mes)
    // if (mes[0] == '#'){
    //   console.log('zmienione')
    //   if (mes[1] !==' '){
    //     mes = '#'+mes;
    //   }
    // }
    if (mes[0] == '#'){
      setInfo({
        text: 'Wiadomość nie zaczynać się #!',
        type: 'info'
      })
      return 
    }
    if (mes == ''){
      setInfo({
        text: 'Wiadomość nie może być pusta!',
        type: 'info'
      })
      return 
    }
    client.current.send(JSON.stringify({
      // type: "message",
      message: mes,
      username: user.username,
      // sendTime: new Date()
    }));
    setMessage(message => '')
  }



  // useEffect(() => {
  //   console.log(messagesArray);
  // }, [messagesArray])
  // useEffect(() => {
  //   if ()
  // }, [cooldown])
  useEffect(() => {
    if (scrollBody) {
      scrollBody.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight+50, behavior: 'smooth' });
      });
    }
  }, [messagesArray])

  const [style, setStyle] = useState('blue');
  const giveColor = (messagess, etc) => {
    if (messagess == user.username) {
      return <div className="message-body-my"><div className='my-message'>{etc?.message}</div></div>
    }
    else {
      return <div className="message-body-enemy"><div className='enemy-message'>{etc?.message}</div></div>
    }
  }

  return (

    <div className="Chat-view" onKeyUp={e => (e.key === 'Enter' && sendMessage(e, message))}>
      
      {/* #TODO: dodać topbar taki jak w figmie */}
      <div className="top-chat-bar">
        <button className="action-button" onClick={() => setShowRevealChoice(true)}>{ifWanting ? "Zrezygnuj" : "Odkryj"}</button>
        <h4>{enemyUsername}</h4>
        {/* <button onClick={() => {
          scrollBody.current.scrollTop = 0
          //  scrollBody.current.scrollHeight
        }}>do dołu</button> */}
        <button className="action-button" onClick={() => navigate("/")}>Menu</button>
      </div>
      
      <div className='chatFlip chat-body ' id="chatBody" ref={scrollBody}>
        <div className="greeting">
          <span>To jest początek Waszej znajomości. Zapytajcie się co u Was słychać, czy ananas może legalnie znajdować się na pizzy czy lubicie Bounty...</span>
        </div>
        {/* <div   */}
        {/* // id='messages-array' className="messages-array"> */}
        {messagesArray.map(mes => {
          return <>
            {mes.message[0] != '#'  ? <div className="message-body" onClick={(e) => {
              // console.log(mes)
              setMoreInfoTrigger(!moreInfoTrigger);
            }}>

              {giveColor(mes?.username, mes)}


            </div>
            :
            <span className="chat-fancy">{mes.message.slice(4, mes.message.length)}</span>
            }
            
        </>
        })
        }
      </div>
      {/* <div className="input-chat bottom-bar"> zamienione*/} 
      <div className="input-chat">
        <img className='xLogo chat-icon' src={XLogo} alt="" onClick={() => setShowRejectChoice(true)} />
        <div className='send-message'>
          <input  placeholder='Napisz coś...' value={message} maxlength="255" type="text" onChange={e => setMessage(e.target.value)}></input>
          <button onClick={e => {
            // setMessage('');
            e.preventDefault()
            e.target.parentElement.parentElement.querySelector('input').focus()
            sendMessage(e, message);
          }}><img src={sendLogo} /></button>
        </div>
        <img className='iceBraker chat-icon' onClick={() => sendIcebreaker()} src={iceLogo} alt="" />
      </div>
      {showRevealPanel && <PopUp show={showRevealPanel} setShow={setShowRevealPanel} head2={"Druga osoba chce cię poznać"} clas={'chatBttns'} funCtion1={revealUser} />}


      {showRevealChoice && <PopUpBase type="choice" prompt={!ifWanting ? "Czy na pewno chcesz się poznać?" : "Czy na pewno chcesz anulować?"} onNo={() => setShowRevealChoice(false)} onYes={revealUser} handleClose={() => setShowRevealChoice(false)}>
        <div>reveal?</div>
      </PopUpBase>}

      {showRejectChoice && <PopUpBase type="choice" prompt="Czy na pewno chcesz się rozłączyć?" onNo={() => setShowRejectChoice(false)} onYes={rejectUser} handleClose={() => setShowRejectChoice(false)}>
        <div>reject?</div>
      </PopUpBase>}


      {ifRejected && <PopUpBase type='rejected-view' />}
      {ifRevealed && <PopUpBase type='revealed-view' revealObject={revealObject} />}

    </div>

  )
};

export default Chat;
