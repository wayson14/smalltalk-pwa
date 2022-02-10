import {React, useState, useContext } from 'react';
import { UserContext } from "../services/UserContext";
import { InfoContext } from '../services/InfoContext';


const Match = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <div>Match</div>
  )
}

export default Match