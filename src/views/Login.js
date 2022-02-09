import { React, useState, useContext } from 'react';
import { UserContext } from '../services/UserContext';


const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const logout = () => {
    setUser('')
    //logika wylogowania do bazy danych
    console.log('logout');
  }

  const login = () => {
    //logika uwierzytelniania do bazy danych
    setUser({
      username : email,
      password : password
    })
    console.log('login');
  }

  const register = () => {
    //logika tworzenia usera do bazy danych
    setUser({
      username : email,
      password : password
    })
    console.log('login');
  }

  return <div className="Login">
    {!user ? <div className='input-section vertical'>
      <input type="text" placeholder='email' onChange={(e) => setEmail(e.target.value)}></input>
      <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)}></input>
      <button onClick={() => login()}>login</button>
      <button onClick={() => register()}>register</button>
    </div> : 
    <button onClick={() => logout()}>logout</button>}
    


  </div>;
};

export default Login;
