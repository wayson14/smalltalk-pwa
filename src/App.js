import {React, useState, useMemo, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link } from "react-router-dom";
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

// import OneSignal from 'react-onesignal';

import {request} from './services/client';

import Test from './views/Test.js'
function App() {

  const [counter, setCounter] = useState(0);



  const [user, setUser] = useState();
  const [info, setInfo] = useState('info');

  

  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  const infoValue = useMemo(() => ({ info, setInfo}), [info, setInfo]);
  

  // useEffect(() => {
  //   OneSignal.init({
  //     appId: "YOUR-APP-ID-HERE"
  //   });
  // }, []);

  // request('http://localhost:7000','/user')
  //   .then(res => {console.log(res);})
  return (
    <div className="App">
      
      <UserContext.Provider value={userValue}>
      <InfoContext.Provider value={infoValue}>
        <Router>
          <div className='wrapper'>
            <div className='main'>
              <Routes>
                <Route path="/" element={user ? <Match/> : <Login info={info}/>}/>
                <Route path="/counter" element={<Test counter={counter} setCounter={setCounter}/>}/>
                <Route path="/chat" element={user ? (user.roomID ? <Chat/> : <Match/>) : <Login info="Musisz się najpierw zalogować!"/>}/>
                <Route path="/profile" element={user ? <Profile/> : <Login info="Musisz się najpierw zalogować!"/>}/>
                <Route path="/circles" element={user ? <Circles/> : <Login info="Musisz się najpierw zalogować!"/>}/>
                <Route path="/searching" element={<Searching/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/test" element={<Test/>}/>
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
