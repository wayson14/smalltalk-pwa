import {React, useContext, useEffect } from 'react';
import { UserContext } from "../services/UserContext";
import { InfoContext } from "../services/InfoContext";
import ellipse from './loginIcon/Ellipse.svg';
import {useNavigate} from "react-router-dom";
import { getRoomID, joinWaitingroom, leaveWaitingroom } from "../services/api_methods";
import {handleErrorResponse} from '../services/client'
import useSound from 'use-sound';
import sweden from '../media/Sweden.mp3'

const Searching = () => {

  const [playSweden] = useSound(sweden);
  const { user, setUser } = useContext(UserContext);
  const { info, setInfo } = useContext(InfoContext);
  const navigate = useNavigate();
   
  useEffect(() => {
    playSweden()
  }, [])

  
  useEffect(() => {
    
    FindMatch()
    let interval = setInterval(() => {
      FindMatch()}, 3000)

    return () => {clearInterval(interval)}
  }, [])
  const chat = () => {
    const path = `/chat`; 
    navigate(path);
  }
    // FindMatch();
  
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
        setUser(user => ({...user, roomID : res.message}))
        // console.log("POKOJ: ", res.message)
      }
        )
      .then(() => {
        
        // console.log(`User id: ${user.id} has been given a new room ID: ${user.roomID}`)
        navigate('/chat')})
      .catch(err => {
        if(err.message!=='Poczekaj na przydzielenie do pokoju przez administratora.'){setInfo({
        text: err.message,
        type: err.type
      })}
    })
  }
  return (
  <div className="Searching-view" >
      <img className="elipse" src={ellipse} />
      <h1>Oczekiwanie na przydzielenie do sesji<span className='dot'>.</span><span className='dot'>.</span><span className='dot'>.</span></h1>
      <div className='searching-button-panel'>
        {/* <button className='searching-button' onClick={()=>FindMatch()}>Dołącz</button> */}
        <button className='searching-button' onClick={()=>leaveFromSearching()} >Opuść poczekalnie</button>
      </div>
  </div>
  )
  }

export default Searching