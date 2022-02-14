import {React, useState, useContext } from 'react';
import { UserContext } from "../services/UserContext";
import { InfoContext } from '../services/InfoContext';
import { getRoomID, authRoom } from "../services/api_methods";

const Match = () => {
  const { user, setUser } = useContext(UserContext);

  const findMatch = () => {
    getRoomID(user.id)
      .then(roomID => setUser(user => ({...user, roomID : roomID})))
      .then(() => console.log(`User id: ${user.id} has been given a new room ID: ${user.roomID}`))
      .catch(err => console.log(err))
  }
  return (
    <div>
      <div>Match</div>
      <button onClick={() => findMatch()}>szukaj</button>
    </div>
    
  )
}

export default Match