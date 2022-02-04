import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Chat from './components/Chat.js'
import Hub from './components/Hub.js'
import Login from './components/Login.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      <Router>
        <Link to="/chat">chat</Link>
        <Link to="/hub">hub</Link>
        <Link to="/login">login</Link>
        <div className='main'>
          <Routes>
            <Route path="/chat" element={<Chat/>}/>
            <Route path="/hub" element={<Hub/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </div>

      </Router>
      </header>
     
    </div>
  );
}

export default App;
