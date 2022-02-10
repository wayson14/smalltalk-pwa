import { React, useState, useContext, useEffect } from 'react';
import { UserContext } from '../services/UserContext';
import { InfoContext } from '../services/InfoContext';
import ArrayList from '../components/ArrayList';
import { authUserLogin, authUserLogout, authUserRegister } from '../services/api_methods';

const Login = ({info}) => {
  
  const { user, setUser } = useContext(UserContext);

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ socialContact, setSocialContact ] = useState('');

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
        {!validateEmail(email) && wrongs.push("Invalid email!")};
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
      .then(user => setUser(user))
      .catch(err => setLoginInfo(err))
    // setUser({
    //   username : email,
    //   password : password
    // })
    console.log('login');
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
  

  return <div className="Login">
    <div className="container">
      <button className="option-button" onClick={() => setFormType('login') }>Arleady have an account</button>
      <button className="option-button" onClick={() => setFormType('register')}>Create account</button>
    </div>
    {!user ? (formType === 'login' ? 
    <div className='input-section vertical'>
      <ArrayList array={loginInfo}></ArrayList>
      <input type="text" placeholder='email' onChange={(e) => setEmail(e.target.value)}></input>
      <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)}></input>
      <button onClick={() => login()}>login</button>
      
    </div> : 
    <div className="input-section vertical">
      <ArrayList array={loginInfo}></ArrayList>
      <input type="text" placeholder='email' onChange={(e) => setEmail(e.target.value)}></input>
      <input type="text" placeholder='facebook/telephone' onChange={(e) => setSocialContact(e.target.value)}></input>
      <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)}></input>
      <input type="password" placeholder='confirm password' onChange={(e) => setConfirmPassword(e.target.value)}></input>
      <button onClick={() => register()}>register</button>
    </div> ): 
    <button onClick={() => logout()}>logout</button>}
    


  </div>;
};

export default Login;
