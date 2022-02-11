import { React, useState, useContext } from 'react';
import { UserContext } from '../services/UserContext';
import userLogo from './loginIcon/user.svg';
import passwordLogo from './loginIcon/Group 2.svg';


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
    {!user ? <div className='input vertical'>
    <h1>Logowanie</h1>
    <div className='input-login'>
      <div className='loginInput'>
        <input type="text" placeholder='Login' onChange={(e) => setEmail(e.target.value)}></input>
        <img src={userLogo} alt="" />
      </div>
      <div className='passwordInput'>
        <input type="password" placeholder='Hasło' onChange={(e) => setPassword(e.target.value)}></input>
        <img src={passwordLogo} alt="" />
      </div>
      <button onClick={() => login()}>Zaloguj ➞</button>
      <p className='para'>Nie pamiętam hasła</p>
      <div className='registerQestion'>
        <p>Nie masz konta? </p>
        <button onClick={() => register()}>Zarejestruj się</button>
      </div>
    </div>
    </div>: 
    <button onClick={() => logout()}>Wyloguj</button>}
  </div>;
};

export default Login;
