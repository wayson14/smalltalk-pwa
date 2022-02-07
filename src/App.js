import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link } from "react-router-dom";
import './App.css';
import Chat from './views/Chat.js'
import Profile from './views/Profile.js'
import Login from './views/Login.js'
import Admin from './views/Admin.js'
import Circles from './views/Circles.js'

import {request} from './client';

function App() {
  // request('http://localhost:7000','/user')
  //   .then(res => {console.log(res);})
  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <Link to="/chat">chat</Link>
        <Link to="/profile">profile</Link>
        <Link to="/login">login</Link>
        <Link to="/circles">circles</Link>
        <Link to="/admin">admin</Link>
        <div className='main'>
          <Routes>
            <Route path="/" element={<Profile/>}/>
            <Route path="/chat" element={<Chat/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/circles" element={<Circles/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </div>

      </Router>
      </header>
     
    </div>
  );
}

export default App;
