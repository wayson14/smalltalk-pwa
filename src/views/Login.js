import { React, useState, useContext, useEffect } from 'react';
import { UserContext } from '../services/UserContext';
import { InfoContext } from '../services/InfoContext';

import {useNavigate} from "react-router-dom";
import userLogo from './loginIcon/user.svg';
import passwordLogo from './loginIcon/Group 2.svg';
import arrowLogo from './loginIcon/Arrow 2.svg';

import ArrayList from '../components/ArrayList';
import { authUserLogin, authUserLogout, authUserRegister, getUser, parseUserObject } from '../services/api_methods';
import useAsyncState from '../services/useAsyncState';

// import coreapi from 'coreapi' 
const Login = ({info}) => {
  
  const { user, setUser } = useContext(UserContext);
  const [ style, setStyle ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ socialContact, setSocialContact ] = useState('');

  const [ gottenToken, setGottenToken ] = useAsyncState('');

  const [ formType, setFormType ] = useState('login');
  const [ loginInfo, setLoginInfo ] = useState([]);
  const [ submitted, setSubmitted ] = useState(false);

  const navigate = useNavigate(); 
  // let client  = new coreapi.Client()

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
      .then(user => setUser(''))
      .catch(err => setLoginInfo(err))
    console.log('logout');
  }


  const loginError = ()=>{
    setTimeout(function(){setStyle('loginError')},100)
    setTimeout(function(){setStyle('')},1300)
  }

  const login = () => {
    authUserLogin(email, password)
      .then(res => {
        if (res === null){
          // throw new Error('Złe dane logowania!');
          loginError()
        }
        // setToken(token)
        return res.key;
        // setUser(user);
      })
      .then(token => {
        // let auth = client.auth.TokenAuthentication({
        //   token: token
        // })
        // client = window.coreapi.Client({auth: auth})
        return setGottenToken(token).then(() => getUser(token))
        // return getUser(token) //gdzieś by można przechowywać ten token,
        // jeszcze nie wiem gdzie 
      })
      .then(user => {
        // console.log(user)
        setUser(parseUserObject(user,gottenToken));
        console.log('login');
        navigate('/')
        
      })
      .catch(err => setLoginInfo(loginInfo => {
        console.log(err)
          return [...loginInfo, err.message]}
        ))
  }

  const register = () => {
    console.log(email, password, username, socialContact);
    if(checkCredentials()){
      authUserRegister(email, password, username, socialContact)
        .then(res => console.log(res))
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
     onKeyUp={e => {
       e.key === 'Enter' & formType === 'login' && login()
       e.key === 'Enter' & formType === 'register' && register()
      }}>
     {formType === 'login' ? 
    <div className='input-section vertical'>
      {/* <ArrayList array={loginInfo}></ArrayList> */}
      <h1>Logowanie</h1>
      <div className={`inputLogin`}>
        <div className={`loginInput ${style}`}>
          <input type="text" placeholder='Login' onChange={(e) => setEmail(e.target.value)}></input>
          <img src={userLogo} alt="" />
        </div>
        <div className={`passwordInput ${style}`}>
          <input type="password" placeholder='Hasło' onChange={(e) => setPassword(e.target.value)}></input>
          <img src={passwordLogo} alt="" />
        </div>
        <div className='bttn'>
          <button onClick={() => login()}>Zaloguj ➜</button>
        </div>
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
      <div className='inputLogin register'>
        <div className={`loginInput`}>
          <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)}></input>
          <img src={userLogo} alt="" />
        </div>
        <div className='loginInput fb'>
          <input type="text" placeholder='Nazwa użytkownika' onChange={(e) => setUsername(e.target.value)}></input>
        </div>
        <div className='loginInput fb'>
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
        <div className='bttn'>
          <button onClick={() => register()}>Utwórz ➜</button>
        </div>
      </div>
      <div className="footer">
        <p>Masz już konto?</p>
      <button className="option-button" onClick={() => setFormType('login')}>Zaloguj się</button>
    </div>
    </div> }
    {/* : 
    navigate("/")
    // <button onClick={() => logout()}>Wyloguj</button>
    } */}
  </div>;
};

export default Login;
