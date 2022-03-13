import {React, useContext } from 'react';
import { UserContext } from "../services/UserContext";
import { InfoContext } from "../services/InfoContext";
import ellipse from './loginIcon/Ellipse.svg';
import {useNavigate} from "react-router-dom";
import { getRoomID, joinWaitingroom, leaveWaitingroom } from "../services/api_methods";
import {handleErrorResponse} from '../services/client'

const Searching = () => {
  const { user, setUser } = useContext(UserContext);
  const { info, setInfo } = useContext(InfoContext);
  const navigate = useNavigate();
   
  const chat = () => {
    const path = `/chat`; 
    navigate(path);
  }
  // const chat1 = () => {
  //   const path = `/chat1`; 
  //   navigate(path);
  // }
  const leaveFromSearching=()=>{
    leaveWaitingroom()
    navigate('/')
  }
  const FindMatch = () => {
    getRoomID()
      //zmienić w przyszłości tak aby cały proces modyfikacji usera dział się na serwerze
      .then(res => {
        
        if (isNaN(res.message)){
          throw new Error (res.message)
        }
        return handleErrorResponse(res)
      })
      .then(res => {
        setInfo({
        })
        setUser(user => ({...user, roomID : res.message}))})
      .then(() => {
        
        console.log(`User id: ${user.id} has been given a new room ID: ${user.roomID}`)
        navigate('/chat')})
      .catch(err => setInfo({
      }))
  }
  return (
  <div className="Searching-view" onLoad={()=>FindMatch()}>
      <img className="elipse" src={ellipse} />
      <h1>Szukanie<span className='dot'>.</span><span className='dot'>.</span><span className='dot'>.</span></h1>
      <div className='searching-button-panel'>
        <button className='searching-button' onClick={()=>FindMatch()}>Odśwież</button>
        <button className='searching-button' onClick={()=>leaveFromSearching()} >Opuść poczekalnie</button>
      </div>
  </div>
  )
}

export default Searching