import {React, useState, useEffect} from 'react';
import {request} from '../client';
import { getUser, createUser } from '../api_methods';
const Profile = () => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    console.log(userData);
  }, [userData])
  return <div>
      <button onClick={()=> {
        getUser(4).then(user => console.log(user))
      }}>fetch user 4</button>

      <button onClick={()=> {
        createUser('sposob', 'sposob.1104@gmail.com', 'passwdroot').then(user => console.log(user))
      }}>create user</button>
    </div>;
};

export default Profile;
