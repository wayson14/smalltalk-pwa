import { React, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { UserContext } from "../services/UserContext";
import { InfoContext } from '../services/InfoContext';
import { joinCircle, getCircle } from '../services/api_methods'
import { getRoomID, joinWaitingroom, leaveWaitingroom } from "../services/api_methods";
import arrowLogo from './loginIcon/Arrow 2.svg';
import qrLogo from './loginIcon/QR.svg';
import {handleErrorResponse} from '../services/client'

const Match = () => {
  const { user, setUser } = useContext(UserContext);
  const { info, setInfo } = useContext(InfoContext);
  const [matching, setMatching] = useState(false);
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [circleCode, setCircleCode] = useState('')
  const [style, setStyle] = useState('');

  const loginError = () => {
    setTimeout(function () { setStyle('codeCircleError') }, 100)
    setTimeout(function () { setStyle('') }, 1300)
  }
  const navigate = useNavigate();
  const searching = () => {
    const path = `/searching`;
    navigate(path);
  }
  const FindMatch = () => {
    getRoomID()
      //zmienić w przyszłości tak aby cały proces modyfikacji usera dział się na serwerze
      .then(res => {
        if (isNaN(res.message)) {
          setInfo({
            text: res.message,
            type: 'error'
          })
          throw new Error(res.message)
        }
        setUser(user => ({ ...user, roomID: res.message }))
      })
      .then(() => {console.log(`User id: ${user.id} has been given a new room ID: ${user.roomID}`)
    setInfo({
      text: "Pomyślnie dołączono do sesji!",
      type: "success"
    })})
      .catch(err => {console.error(err)
      setInfo({
        text: err,
        type: 'error'
      })})
  }

  const enterChat = () => {
    joinWaitingroom().then(
      () => searching()
    )
  }

  return (
    <div onKeyUp={e => {
      e.key === 'Enter' && enterChat()
    }}>
      <TopBar />
      <div className='Match-view'>
        <div className='scanner content-container'>
          <form className={`codeInput ${style}`}>
            <div className="join-circle-input-form-line">
            <input className="join-circle-input" type="text" placeholder="Wpisz kod" onChange={
              (e) => {
                setCircleCode(() => e.target.value)
              }
            }></input>
            <button className="join-circle-button" onClick={
              (e) => {
                //to będzie robione w Django
                e.preventDefault();

                joinCircle(circleCode) //TODO: błędy powinny być przekazywane do popupu z requesta
                  .then(res => handleErrorResponse(res, "Błąd przy dołączaniu do kręgu!"))
                  .then(res => {
                    
                    let IDs = [];
                    console.log(res)
                    setInfo({
                      text: res.message,
                      type: res.type
                    })
                    navigate('/circles')
                  })
                  .catch(err => {
                    setInfo({
                      text: err,
                      type: 'error'
                    })
                    console.log(err)
                  })
              }
            }>
              <img src={arrowLogo} alt="" />
            </button>
            </div>
          </form>
          <img src={qrLogo} className='qr' />
          {!matching && <button className='chat-action-button' onClick={enterChat}>Chatuj</button>}
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