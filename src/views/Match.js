import {React, useState, useContext } from 'react';
import { UserContext } from "../services/UserContext";
import { InfoContext } from '../services/InfoContext';
import { getRoomID, joinWaitingroom, leaveWaitingroom } from "../services/api_methods";

const Match = () => {
  const { user, setUser } = useContext(UserContext);
  const [matching, setMatching ] = useState(false);

  const findMatch = () => {
    getRoomID()
      //zmienić w przyszłości tak aby cały proces modyfikacji usera dział się na serwerze
      .then(res => {
        if (isNaN(res.message)){
          throw new Error (res.message)
        }
        setUser(user => ({...user, roomID : res.message}))})
      .then(() => console.log(`User id: ${user.id} has been given a new room ID: ${user.roomID}`))
      .catch(err => console.log(err))
  }

  return (
    <div>
      <div>Match</div>
      {!matching && <button onClick={() => joinWaitingroom().then(
        () => setMatching(true)
      )}>szukaj</button>}
      {matching && 
      <>
        <button onClick={() => findMatch()}>odśwież</button>
        <button onClick={() => leaveWaitingroom().then(
          () => setMatching(false)
        )}>wyjdź z poczekalni</button>
      </>}
    </div>
    
  )
}

export default Match