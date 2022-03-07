import {React, useState, useContext } from 'react';
import {useNavigate} from "react-router-dom";
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { UserContext } from "../services/UserContext";
import { InfoContext } from '../services/InfoContext';
import { joinCircle, getCircle } from '../services/api_methods'
import { getRoomID, joinWaitingroom, leaveWaitingroom } from "../services/api_methods";
import arrowLogo from './loginIcon/Arrow 2.svg';
import qrLogo from './loginIcon/QR.svg';

const Match = () => {
  const { user, setUser } = useContext(UserContext);
  const [matching, setMatching ] = useState(false);
  const [circleCode, setCircleCode ] = useState('')
  const [ style, setStyle ] = useState('');

  const loginError = ()=>{
    setTimeout(function(){setStyle('codeCircleError')},100)
    setTimeout(function(){setStyle('')},1300)
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
        if (isNaN(res.message)){
          throw new Error (res.message)
        }
        setUser(user => ({...user, roomID : res.message}))})
      .then(() => console.log(`User id: ${user.id} has been given a new room ID: ${user.roomID}`))
      .catch(err => console.error(err))
  }

  return (
    <div>
        <TopBar/>
      <div className='Scanner'>
        <div className='border'>
        <form className={`codeInput ${style}`}>
        <input type="text" placeholder="Wpisz kod" onChange={
          (e) => {setCircleCode(() => e.target.value)
          }
        }></input>
        <button onClick={
          (e)=>{
            //to będzie robione w Django
            e.preventDefault();
            
            
      
            joinCircle(circleCode)
              .then(circleID => {
                // if (user.circlesIDs){
                //   if(user.circlesIDs.indexOf(circleID) > -1){
                //     // alert('Dołączono już do tego kręgu!')
                //     loginError()
                //     return
                //   }
                    
                // }
                let IDs = [];
                // {Array.isArray(user.circlesIDs) ?
                //   IDs = [...user.circlesIDs, circleID]
                //   :
                //   IDs = [circleID]
                // }
                // setUser(user => ({
                //   ...user,
                //   circlesIDs : IDs, 
                // }))
                console.log(circleID)
              })
              .catch(err => console.log(err)) }
        }>
          <img src={arrowLogo} alt="" />
        </button>
      </form>
        <img src={qrLogo} className='qr' />
        </div>
      {!matching && <button className='chatt' onClick={() => joinWaitingroom().then(
        () => searching()
      )}>Chatuj</button>}
        </div>
      {/* {matching && 
      <>
        <button onClick={() => FindMatch()}>odśwież</button>
        <button onClick={() => leaveWaitingroom().then(
          () => setMatching(false)
        )}>wyjdź z poczekalni</button>
      </>} */}
      <BottomBar/>
    </div>
    
  )
}

export default Match