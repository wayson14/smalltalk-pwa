import { React, useState, useContext, useEffect } from 'react';
import { UserContext } from '../services/UserContext';
import { InfoContext } from '../services/InfoContext';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import userLogo from './loginIcon/user.svg';
import passwordLogo from './loginIcon/Group 2.svg';
import fbLogo from './loginIcon/icons8-facebook.svg';


import ArrayList from '../components/ArrayList';
import { changeSocial, authUserLogin, authUserLogout, authUserRegister, getUser, parseResponseToInfo, parseErrorToInfo, parseUserObject } from '../services/api_methods';
import useAsyncState from '../services/useAsyncState';

// import coreapi from 'coreapi' 
const Login = ({ passedInfo }) => {

  const { user, setUser } = useContext(UserContext);
  const { info, setInfo } = useContext(InfoContext);

  const [cookies, setCookie] = useCookies();

  const [style, setStyle] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [socialContact, setSocialContact] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState();

  const [gottenToken, setGottenToken] = useAsyncState('');
  const [loggedIn, setLoggedIn] = useState()
  const [formType, setFormType] = useState('login');
  const [loginInfo, setLoginInfo] = useState([]);


  const navigate = useNavigate();
  // let client  = new coreapi.Client()

  // useEffect(() => {
  //   setInfo(info);
  // }, [info])

  useEffect(() => {
    let wrongs = [];
    setLoginInfo(loginInfo => []);
    { password !== confirmPassword & formType === 'register' && wrongs.push('Passwords dont match!') }
    { !validateEmail(email) & formType === 'register' && wrongs.push("Błędny email!") };
    setLoginInfo(wrongs);

  }, [password, confirmPassword, socialContact, email])

  // useEffect(() => {
  //   console.log('SPRAWDZONE')
  //   if (true){
  //     changeSocial({
  //       csrftoken: cookies.csrftoken,
  //       socialContact: 'socialContact'})
  //     .then(mes => console.log(mes))
  //   }
  // }, [cookies.csrftoken])
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


  const loginError = () => {
    setTimeout(function () { setStyle('loginError') }, 100)
    setTimeout(function () { setStyle('') }, 1300)
  }

  const login = (e) => {
    e.preventDefault()

    authUserLogin(email, password)
      .then(res => {
        if (res === null) {
          // throw new Error('Złe dane logowania!');
          loginError()
          setInfo({
          })
        }
        // console.log(res)
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
        setUser(parseUserObject(user, gottenToken));
        setInfo({
        })
        console.log('login');
        setLoggedIn(true)
        navigate('/')

      })
      .catch(err => {
        parseErrorToInfo(err).then(res => {
        setInfo({
          type: 'error',
          text: res
        })
      }
      )
      }
      )
  }

  const register = (e) => {
    e.preventDefault()
    // console.log(email, password, username, socialContact);
    if (!privacyConsent){
      setInfo({
        text: 'Musisz zgodzić się na warunki przetwarzania danych osobowych przed założeniem konta!',
        type: 'info'
      })
      return
    }
    if (checkCredentials()) {
      authUserRegister(email, password, username, socialContact)
        .then(res => {
          console.log(res)
          if(res !== null){
            setInfo({
            })
            
            // navigate('/login')
            return res.key
          } 
          else{
            console.log(res)
            loginError()
            throw 'Złe dane przy tworzeniu użytkownika!'
          }
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
          setUser(parseUserObject(user, gottenToken));
          setInfo({
          })
          console.log('login');
          navigate('/') //addFacebook
  
        })
        .catch(err => {
          parseErrorToInfo(err).then(res => {
          setInfo({
            type: 'error',
            text: res
          })
        }
        )
        }
        )

      // setInfo({
      //   type: 'success',
      //   text: 'Pomyślnie zarejestrowano!'
      // })
      // console.log('registered');
    }
  }


  return <div className="Login-view"
    // onLoad={
    //   ()=>authUserLogin('asdf@asdf.com', 'password')
    //   .then(user => setUser(user))
    //   .catch(err => setLoginInfo(err))
    //   }
    onKeyUp={e => {
      e.key === 'Enter' & formType === 'login' && login()
      e.key === 'Enter' & formType === 'register' && register()
    }}>
    {formType === 'login' ?<>
    
      <div className='content-container'>
      <h2 className="view-header">Logowanie</h2>
        <form className='input-form'>

          <div className={`input-form-line ${style}`}>
            <img src={userLogo} alt="" />
            <input type="text" placeholder='E-mail' onChange={(e) => setEmail(e.target.value)}></input>
            
          </div>

          <div className={`input-form-line ${style}`}>
            <img src={passwordLogo} alt="" />
            <input type="password" placeholder='Hasło' onChange={(e) => setPassword(e.target.value)}></input>
            
          </div>
        
          <button className='login-action-button' onClick={(e) => login(e)}>Zaloguj ➜</button>

        </form>
        
      </div> 
      </>
      :
      
      <>
      <div className='content-container'>
      <h2 className="view-header">Rejestracja</h2>
        <form className='input-form'>

          <div className={`input-form-line ${style}`}>
            <img src={userLogo} alt="" />
            <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)}></input>
            
          </div>
          <div className={`input-form-line ${style}`}>
            <img src={userLogo} alt="" />
            <input type="text" placeholder='Nazwa użytkownika' onChange={(e) => setUsername(e.target.value)}></input>
            
          </div>

          {/* <div className={`input-form-line ${style}`}>
            <img className='fbLogo' src={fbLogo} alt="" />
            <input type="text" placeholder='Link do Twojego FB' onChange={(e) => setSocialContact(e.target.value)}></input>
            
          </div> */}

          <div className={`input-form-line ${style}`}>
            <img src={passwordLogo} alt="" />
            <input type="password" placeholder='Hasło' onChange={(e) => setPassword(e.target.value)}></input>
            
          </div>
          <div className={`input-form-line ${style}`}>
            <img src={passwordLogo} alt="" />
            <input type="password" placeholder='Powtórz Hasło' onChange={(e) => setConfirmPassword(e.target.value)}></input>

          </div>
          <div className="consent-container">
            <div>
              <label  className="consent-text" for="pivacyConsent">Wyrażam zgodę na przetwarzanie moich danych osobowych</label>
              <br/>
              <a href="https://smalltalk.today/">Regulamin</a>
            </div>
            <input onChange={(e) => {setPrivacyConsent(e.target.checked)}} className="consent-checkbox" type="checkbox" id="privacyConsent"/>
          </div>
          <button className='login-action-button' onClick={(e) => register(e)}>Zarejestruj ➜</button>

        </form>
        
      </div> 
      </>

      // <div className="Register vertical">
      //   <ArrayList array={loginInfo}></ArrayList>
      //   <button className="option" onClick={() => setFormType('login')}> <img src={arrowLogo} alt="" /> </button>
      //   <h1 className='hh1'>Rejestracja</h1>
      //   <div className='inputLogin register'>
      //     <div className={`loginInput`}>
      //       <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)}></input>
      //       <img src={userLogo} alt="" />
      //     </div>
      //     <div className='loginInput fb'>
      //       <input type="text" placeholder='Nazwa użytkownika' onChange={(e) => setUsername(e.target.value)}></input>
      //     </div>
      //     <div className='loginInput fb'>
      //       <input type="text" placeholder='Facebook/Telefon' onChange={(e) => setSocialContact(e.target.value)}></input>
      //     </div>
      //     <div className='passwordInput'>
      //       <input type="password" placeholder='Hasło' onChange={(e) => setPassword(e.target.value)}></input>
      //       <img src={passwordLogo} alt="" />
      //     </div>
      //     <div className='passwordInput pass2'>
      //       <input type="password" placeholder='Powtórz Hasło' onChange={(e) => setConfirmPassword(e.target.value)}></input>
      //       <img src={passwordLogo} alt="" />
      //     </div>
      //     <div className='bttn'>
      //       <button onClick={() => register()}>Utwórz ➜</button>
      //     </div>
      //   </div>
      //   <div className="footer">
      //     <p>Masz już konto?</p>
      //     <button className="option-button" onClick={() => setFormType('login')}>Zaloguj się</button>
      //   </div>
      // </div>}
    /* : 
    navigate("/") */}
    <footer className="footer">
      <p>{formType === 'login' ? 'Nie masz konta?' : 'Masz już konto?'}</p>
      <p className="link-button" onClick={() => {formType === 'login' ? setFormType('register') : setFormType('login')}}>
        {formType === 'login' ? 'Zarejestruj się' : 'Zaloguj się'}</p>
  
    </footer>
    {/* <button onClick={() => logout()}>Wyloguj</button> */}

  </div>;
};

export default Login;
