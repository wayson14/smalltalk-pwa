import { React, useState, useContext, useEffect } from 'react';
import { UserContext } from '../services/UserContext';
import { InfoContext } from '../services/InfoContext';

import userLogo from './loginIcon/user.svg';
import passwordLogo from './loginIcon/Group 2.svg';
import arrowLogo from './loginIcon/Arrow 2.svg';

import ArrayList from '../components/ArrayList';
import { authUserLogin, authUserLogout, authUserRegister, getUser } from '../services/api_methods';
import useAsyncState from '../services/useAsyncState';

const Login = ({info}) => {
  
  const { user, setUser } = useContext(UserContext);

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ socialContact, setSocialContact ] = useState('');

  const [ token, setToken ] = useAsyncState('');

  const [formType, setFormType ] = useState('login');
  const [ loginInfo, setLoginInfo ] = useState([]);
  const [ submitted, setSubmitted ] = useState(false);
  useEffect(() => {
    setLoginInfo(info);
  }, [info])

  useEffect(() => {
        let wrongs = [];
        setLoginInfo(loginInfo => []);
        {password !== confirmPassword & formType === 'register' && wrongs.push('Passwords dont match!')}
        {!validateEmail(email) & formType === 'register' && wrongs.push("Błędny email!")};
        setLoginInfo(wrongs);
      
  }, [password, confirmPassword, socialContact, email])

  const checkCredentials = () => {
    return true;
  }
  const validateEmail = (emailAdress) => {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/;
    if (emailAdress.match(regexEmail)) {
      return true; 
    } else {
      return false; 
    }
  }
  const logout = () => {
    authUserLogout()
      .then(user => setUser(user))
      .catch(err => setLoginInfo(err))
    console.log('logout');
  }

  const login = () => {
    authUserLogin(email, password)
      .then(res => {
        if (res === null){
          throw new Error('Złe dane logowania!');
        }
        // setToken(token)
        return res.key;
        // setUser(user);
      })
      .then(token => {
        return getUser(token) //gdzieś by można przechowywać ten token,
        // jeszcze nie wiem gdzie 
      })
      .then(user => {
        setUser({
          id: user.pk,
          username: user.username,
          email: user.email,
          roomID: user?.room_id,
          // first_name: user.first_name,
          // last_name: user.last_name
        });
        console.log('login');
      })
      .catch(err => setLoginInfo(loginInfo => {
        console.log(err)
          return [...loginInfo, err.message]}
        ))
  }

  const register = () => {
    if(checkCredentials()){
      authUserRegister()
        .then(user => setUser(user))
        .catch(err => setLoginInfo(err));

      setUser({
        username : email,
        password : password
      })
      console.log('registered');
    }
  }
  

  return <div className="Login" 
  // onLoad={
  //   ()=>authUserLogin('asdf@asdf.com', 'password')
  //   .then(user => setUser(user))
  //   .catch(err => setLoginInfo(err))
  //   }
     onKeyUp={e => (e.key === 'Enter' && login())}>
    {!user ? (formType === 'login' ? 
    <div className='input-section vertical'>
      <ArrayList array={loginInfo}></ArrayList>
      <h1>Logowanie</h1>
      <div className='inputLogin'>
        <div className='loginInput'>
          <input type="text" placeholder='Login' onChange={(e) => setEmail(e.target.value)}></input>
          <img src={userLogo} alt="" />
        </div>
        <div className='passwordInput'>
          <input type="password" placeholder='Hasło' onChange={(e) => setPassword(e.target.value)}></input>
          <img src={passwordLogo} alt="" />
        </div>
        <button onClick={() => login()}>Zaloguj ➜</button>
      </div>
      <div className="footer">
        <p>Nie masz konta?</p>
      <button className="option-button" onClick={() => setFormType('register')}>Zarejestruj się</button>
    </div>
    </div> : 
    <div className="Register vertical">
      <ArrayList array={loginInfo}></ArrayList>
      <button className="option" onClick={() => setFormType('login') }> <img src={arrowLogo} alt="" /> </button>
      <h1 className='hh1'>Rejestracja</h1>
      <div className='inputLogin'>
        <div className='loginInput'>
          <input type="text" placeholder='Login' onChange={(e) => setEmail(e.target.value)}></input>
          <img src={userLogo} alt="" />
        </div>
        <div className='loginInput'>
          <input type="text" placeholder='Facebook/Telefon' onChange={(e) => setSocialContact(e.target.value)}></input>
        </div>
        <div className='passwordInput'>
          <input type="password" placeholder='Hasło' onChange={(e) => setPassword(e.target.value)}></input>
          <img src={passwordLogo} alt="" />
        </div>
        <div className='passwordInput pass2'>
          <input type="password" placeholder='Powtórz Hasło' onChange={(e) => setConfirmPassword(e.target.value)}></input>
          <img src={passwordLogo} alt="" />
        </div>
        <button onClick={() => register()}>Utwórz ➜</button>
      </div>
      <div className="footer">
        <p>Masz już konto?</p>
      <button className="option-button" onClick={() => setFormType('login')}>Zaloguj się</button>
    </div>
    </div> ): 
    <button onClick={() => logout()}>Wyloguj</button>}
  </div>;
};

export default Login;
