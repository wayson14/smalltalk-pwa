import {React, useState, useMemo } from 'react';
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
import {request} from './services/client';

function App() {

  const [user, setUser] = useState('');
  const [info, setInfo] = useState('info');

  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  const infoValue = useMemo(() => ({ info, setInfo}), [info, setInfo]);
  
  // request('http://localhost:7000','/user')
  //   .then(res => {console.log(res);})
  return (
    <div className="App">
      
      <UserContext.Provider value={userValue}>
      <InfoContext.Provider value={infoValue}>
        
        <Router>
          <header className="App-header">
            <Link className="nav-item" to="/chat">Chat</Link>
            <Link className="nav-item" to="/profile">Profile</Link>
            <Link className="nav-item" to="/circles">Circles</Link>
            <Link className="nav-item" to="/login">Login</Link>
            {/* <Link className="nav-item" to="/admin">admin</Link> */}
            {/* <span className="nav-item">{user.username}</span> */}
            <h4 className='logo'><Link to="/" className='logo'>smallTalk</Link></h4>
          </header>
          <div className='wrapper'>
            <div className='main'>
              <Routes>
                <Route path="/" element={user ? <Profile/> : <Login info={info}/>}/>
                <Route path="/chat" element={user ? (user.room_id ? <Chat/> : <Match/>) : <Login info="Musisz się najpierw zalogować!"/>}/>
                <Route path="/profile" element={user ? <Profile/> : <Login info="Musisz się najpierw zalogować!"/>}/>
                <Route path="/circles" element={user ? <Circles/> : <Login info="Musisz się najpierw zalogować!"/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/login" element={<Login/>}/>
                
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
