import { React, useState, useMemo, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import { UserContext } from "./services/UserContext";
import './App.scss';
import { InfoContext } from './services/InfoContext';
import Chat from './views/Chat.js'
import Profile from './views/Profile.js'
import Login from './views/Login.js'
import Admin from './views/Admin.js'
import Circles from './views/Circles.js'
import Match from './views/Match.js'
import Searching from './views/Searching';
import Friends from './views/Friends';
import CreateCircle from './views/CreateCircle';

// import OneSignal from 'react-onesignal';

import { request } from './services/client';

import Test from './views/Test.js'
import { getUser, checkSession, parseUserObject } from './services/api_methods';
import useAsyncState from './services/useAsyncState';
function App() {

  const [counter, setCounter] = useState(0);
  const [notificationButton, setNotificationButton] = useState(false);
  const [user, setUser] = useState();
  const [info, setInfo] = useState('info');

  const [isSession, setIsSession] = useAsyncState(false);


  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  const infoValue = useMemo(() => ({ info, setInfo }), [info, setInfo]);

  // useEffect(() => {
  //   OneSignal.init({
  //     appId: "YOUR-APP-ID-HERE"
  //   });
  // }, []);

  // request('http://localhost:7000','/user')
  //   .then(res => {console.log(res);})
  // function askNotificationPermission() {
  //   // function to actually ask the permissions
  //   function handlePermission(permission) {
  //     // set the button to shown or hidden, depending on what the user answers
  //     if(Notification.permission === 'denied' || Notification.permission === 'default') {
  //       setNotificationButton(true);
  //     } else {
  //       setNotificationButton(false);
  //     }
  //   }
  // }
  function checkNotificationPromise() {
    try {
      Notification.requestPermission().then();
    } catch(e) {
      return false;
    }

    return true;
  }
  
    // Let's check if the browser supports notifications

    //cheks if session is valid and if is, fetches the user
    useEffect(() => { 
      checkSession().then(token => {
        console.log(token)
        {token.message !== '' ? (
          setIsSession(true)
          .then((isSession) => {
            console.log("isSession: ", isSession)
            console.log("TOKEN: ",token.message)
            return getUser(token.message)
          })
          .then(userResponse => {
            console.log(userResponse)
            setUser(parseUserObject(userResponse, token.message))
            
          })
          .catch(err => console.log(err))
        ) : (
          setIsSession(false).then(console.log('is session: ',isSession))
          )}
        // console.log(res)
      })
      
      // getUser(user.token).then(res => console.log(res)).catch(err => console.error(err))
      if (!('Notification' in window)) {
        console.log("This browser does not support notifications.");
      } else {
        if(checkNotificationPromise()) {
          Notification.requestPermission()
          // .then((permission) => {
          //   handlePermission(permission);
          // })
        } else {
          Notification.requestPermission(function(permission) {
            // handlePermission(permission);
          });
        }
      }
    }, [])

    useEffect(() => {
      console.log('from app: ',user)
      if (user === ''){
        // navigate('/login')
        setIsSession(false)
      }
      // else{
      //   setIsSession(true)
      // }
    }, [user])
    // useEffect(() => {
    //   getUser().then(res => {
    //     console.log(res)
    //   })
    // }, isSession)
  return (
    
    <div className="App">
      {/* <button className="notification-btn" onClick={() => askNotificationPermission()}>zezwol</button> */}
      <UserContext.Provider value={userValue}>
      <InfoContext.Provider value={infoValue}>

        <Router>
          <div className='wrapper'>
            <div className='main'>
              <Routes>
                <Route path="/" element={isSession ? <Match/> : <Login info={info}/>}/>
                <Route path="/counter" element={<Test counter={counter} setCounter={setCounter}/>}/>
                <Route path="/chat" element={isSession ? (user?.roomID ? <Chat/> : <Match/>) : <Login info="Musisz się najpierw zalogować!"/>}/>
                <Route path="/profile" element={isSession ? <Profile/> : <Login info="Musisz się najpierw zalogować!"/>}/>
                <Route path="/circles" element={isSession ? <Circles/> : <Login info="Musisz się najpierw zalogować!"/>}/>
                <Route path="/searching" element={<Searching/>}/>
                {/* <Route path="/match" element={<Match/>}/> */}
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/test" element={<Test/>}/>
                <Route path="/friends" element={<Friends/>}/>
                <Route path="/createCircle" element={<CreateCircle/>}/>
              </Routes>
            </div>
            </div>
          </Router>
        </InfoContext.Provider>
      </UserContext.Provider>
    </div>
  );
}


export default App;
