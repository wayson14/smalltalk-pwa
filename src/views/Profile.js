import {React, useState, useEffect} from 'react';
import {request} from '../client';
import { getUser, getUserByID } from '../api_methods';
const Profile = () => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    console.log(userData);
  }, [userData])
  return <div>
      <button onClick={()=> {
        getUser(4).then(user => console.log(user))
      }}>fetch</button>
    </div>;
};

export default Profile;
