import {React, useContext } from 'react';
import { UserContext } from "../services/UserContext";
import ellipse from './loginIcon/Ellipse.svg';
import {useNavigate} from "react-router-dom";
import { getRoomID, joinWaitingroom, leaveWaitingroom } from "../services/api_methods";


const Searching = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
   
  const chat = () => {
    const path = `/chat`; 
    navigate(path);
  }
  const chat1 = () => {
    const path = `/chat1`; 
    navigate(path);
  }
  const leaveFromSearching=()=>{
    leaveWaitingroom()
    chat()
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
  <div className="Searching">
      <img src={ellipse} />
      <h1>Szukanie<span className='dot'>.</span><span className='dot'>.</span><span className='dot'>.</span></h1>
      <div className='searchinBttn'>
        <button className='left' onClick={()=>FindMatch()}>Odśwież</button>
        <button onClick={()=>leaveFromSearching()} >Opuść poczekalnie</button>
      </div>
  </div>
  )
}

export default Searching