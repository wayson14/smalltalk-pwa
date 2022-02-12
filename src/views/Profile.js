import {React, useState, useEffect, useContext} from 'react';
import {request} from '../services/client';
import { getUser, createUser, deleteUser } from '../services/api_methods';
import { UserContext } from '../services/UserContext';
const Profile = () => {

  const { user, setUser } = useContext(UserContext)
  const [userData, setUserData] = useState({});
  useEffect(() => {
    console.log(userData);
  }, [userData])

  return (
    <div>
      <button onClick={()=> {
        getUser(4).then(user => console.log(user))
      }}>fetch user 4</button>

      <button onClick={()=> {
        createUser('sposob', 'sposob.1104@gmail.com', 'passwdroot').then(user => console.log(user))
      }}>create user</button>

      <button onClick={()=> {
        deleteUser(7).then(user => console.log(user))
      }}>delete user</button>
      <div className="userInfo">
        <ul>
          {Object.keys(user).map(key => {
            return (
                <li key={key}>{`${key}: ${user[key]}`}</li>
              )})
          }
        </ul>
      </div>
    </div>)
};

export default Profile;
