import {React, useState, useContext } from 'react';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { UserContext } from "../services/UserContext";
import { InfoContext } from '../services/InfoContext';
import { joinCircle, getCircle } from '../services/api_methods'
import { getRoomID, joinWaitingroom, leaveWaitingroom } from "../services/api_methods";

const Match = () => {
  const { user, setUser } = useContext(UserContext);
  const [matching, setMatching ] = useState(false);
  const [circleCode, setCircleCode ] = useState('')

  const findMatch = () => {
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
      <div>Match</div>
      <form>
      <input type="text" placeholder="kod" onChange={
        (e) => {setCircleCode(() => e.target.value)
        }
      }></input>
      <button onClick={
        (e)=>{
          //to będzie robione w Django
          e.preventDefault();
          
          
    
          joinCircle(circleCode)
            .then(circleID => {
              if (user.circlesIDs){
                if(user.circlesIDs.indexOf(circleID) > -1){
                  alert('Dołączono już do tego kręgu!')
                  return
                }
                  
              }
              let IDs = [];
              {Array.isArray(user.circlesIDs) ?
                IDs = [...user.circlesIDs, circleID]
                :
                IDs = [circleID]
              }
              setUser(user => ({
                ...user,
                circlesIDs : IDs, 
              }))
            })
            .catch(err => console.log(err)) }
      }>
        dołącz do kręgu
      </button>
    </form>
      {!matching && <button onClick={() => joinWaitingroom().then(
        () => setMatching()
      )}>szukaj</button>}
      {matching && 
      <>
        <button onClick={() => findMatch()}>odśwież</button>
        <button onClick={() => leaveWaitingroom().then(
          () => setMatching()
        )}>wyjdź z poczekalni</button>
      </>}
      <BottomBar/>
    </div>
    
  )
}

export default Match