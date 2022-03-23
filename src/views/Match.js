import { React, useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { UserContext } from "../services/UserContext";
import { InfoContext } from '../services/InfoContext';
import { joinCircle, getUserCirclesIDs, getWholeUser } from '../services/api_methods'
import { changeSocial, getRoomID, joinWaitingroom, leaveWaitingroom, getUser, parseUserObject } from "../services/api_methods";
import arrowLogo from './loginIcon/Arrow 2.svg';
import qrLogo from './loginIcon/QR.svg';
import { handleErrorResponse } from '../services/client'
import { useCookies } from "react-cookie";

const Match = () => {
  const { user, setUser } = useContext(UserContext);
  const { info, setInfo } = useContext(InfoContext);
  const [matching, setMatching] = useState(false);
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [circleCode, setCircleCode] = useState('')
  const [style, setStyle] = useState('');
  const [showChatButton, setShowChatButton] = useState(false)
  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    // getWholeUser(user.id).then(gottenUser => console.log(gottenUser))
    getUserCirclesIDs().then(res => (res.type == 'error' ? setShowChatButton(false) : setShowChatButton(true)))
    getWholeUser({token: user.token, id: user.id})
      .then(gottenUser => {
        // console.log(gottenUser)
        setUser(parseUserObject(gottenUser, user.token))
      })
      .catch(err => {console.log(err)
      })
    // console.log('COOKIES:',cookies)
  }, [])
  const loginError = () => {
    setTimeout(function () { setStyle('codeCircleError') }, 100)
    setTimeout(function () { setStyle('') }, 1300)
  }
  const navigate = useNavigate();
  const searching = () => {
    const path = `/searching`;
    navigate(path);
  }

  const joinCircleHandler = (e) => {
      //to będzie robione w Django
      e.preventDefault();
      joinCircle(circleCode) //TODO: błędy powinny być przekazywane do popupu z requesta
        .then(res => handleErrorResponse(res, "Błąd przy dołączaniu do kręgu!"))
        .then(res => {
          document.getElementsByClassName("join-circle-input").value = ''

          // document.getElementsById("join-circle-input").value = ''
          let IDs = [];
          // console.log(res)
          setInfo({
            text: res.message,
            type: res.type
          })
          enterChat();
          // navigate('/circles')

        })
        .catch(err => {
          document.getElementById("joinCircleInput").value = ''
          setInfo({
            text: err,
            type: 'error'
          })
          // console.log(err)
        })
  }
  const FindMatch = () => {
    getUserCirclesIDs()
      .then(res => (res.type === 'error' ? Error(res.message) : getRoomID()))
      //zmienić w przyszłości tak aby cały proces modyfikacji usera dział się na serwerze
      .then(res => {
        if (isNaN(res.message)) {
          setInfo({
            text: res.message,
            type: res.type
          })
          // throw new Error(res.message)
          console.log(res.message)
        }
        setUser(user => ({ ...user, roomID: res.message }))
      })
      .then(() => {
        // console.log(`User id: ${user.id} has been given a new room ID: ${user.roomID}`)
        setInfo({
          text: "Pomyślnie dołączono do sesji!",
          type: "success"
        })
      })
      .catch(err => {
        console.error(err)
        setInfo({
          text: err,
          type: 'error'
        })
      })
  }

  const enterChat = () => {
    getUserCirclesIDs()
      .then(res => {
        if (res.type == 'error'){
          throw new Error(res.message);
        }
        else return res
        // return (res.type == 'error' ? reject(res.message) : res)
      })
      .then(res => {
        // console.log(res)
        // console.log('przeszło')
        // setInfo({
        //   text: '',
        //   type: res.type
        // })
        return res
      })
      .then(res => {
        joinWaitingroom().then(
          (res) => {
            // res.type === 'error'
            searching()
          }
        )
      })
      .catch(err => {
        setInfo({
          text: err.message,
          type: 'error'
        })
      })
      
    // joinWaitingroom().then(
    //   (res) => {
    //     // res.type === 'error'
    //     searching()
    //   }
    // )
  }

  return (
    <div onKeyUp={e => {
      e.key === 'Enter' && enterChat()
    }}>
      <TopBar />
  
      <div className='Match-view'>
        <div className='scanner content-container'>
        <h4>Dodaj się do kręgu za pomoca kodu</h4>
          <form className={`codeInput ${style}`}>
            <div className="join-circle-input-form-line">
              
              <input id="joinCircleInput" className="join-circle-input" maxLength="8" type="text" placeholder="Kod kręgu" onChange={
                (e) => {
                  setCircleCode(() => e.target.value.toUpperCase())
                  // e.target.value = circleCode
                  console.log(circleCode)
                }
              }></input>
              <button className="join-circle-button" onClick={e => joinCircleHandler(e) }
              >
                {/* <img src={arrowLogo} alt="" /> */}
                +
              </button>
            </div>
          </form>
          <img src={qrLogo} className='qr' />
          {undefined !== undefined? <button className='continue-action-button' onClick={enterChat}>Kontynuuj</button> 
            : 
          (showChatButton && <button className='chat-action-button' onClick={enterChat}>Chatuj</button>)}
        </div>
        <BottomBar />
      </div>
      {/* {matching && 
      <>
        <button onClick={() => FindMatch()}>odśwież</button>
        <button onClick={() => leaveWaitingroom().then(
          () => setMatching(false)
        )}>wyjdź z poczekalni</button>
      </>} */}

    </div>

  )
}

export default Match