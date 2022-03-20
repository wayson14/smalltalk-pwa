import { React, useState, useContext, useEffect } from 'react';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../services/UserContext';
import { InfoContext } from '../services/InfoContext';

import fbLogo from './loginIcon/icons8-facebook.svg';

import { changeSocial } from '../services/api_methods';

const AddFacebook = () => {
  const [cookies, setCookie] = useCookies();
  const [facebook, setFacebook] = useState('');

  const { user, setUser } = useContext(UserContext);
  const { info, setInfo } = useContext(InfoContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //     changeSocial({
  //         csrftoken: cookies.csrftoken,
  //         socialContact: 'socialContact'})
  //     .then(mes => console.log(mes))
  //   return () => {
  //   }
  // }, [])

  const handleChangeSocial = (e) => {
    e.preventDefault()
    changeSocial({
      csrftoken: cookies.csrftoken,
      link: facebook
    })
      .then(mes => {
        setInfo({
          text: mes.message,
          type: 'success'
        })
        console.log(mes)
        navigate('/')
      })
      .catch(err => setInfo({
        text: 'Nieprawidłowy link.',
        type: 'error'
      }))
      
    }

return (
  <div className="Add-facebook-view">
    <span>Do prawidłowego funkcjonowania aplikacji potrzebujemy linku do Twojego profilu oraz krótkiego Twojego opisu. Będą one wyświetlane jedynie osobom, które zdecydujesz się poznać.</span>
    <form>
      <div className={`input-form-line`}>
        <img className='fbLogo' src={fbLogo} alt="" />
        <input type="text" placeholder='Link do Twojego FB' onChange={(e) => setFacebook(e.target.value)}></input>
        
      </div>
      {/* <div className={`input-form-line`}>
        <img className='fbLogo' src={fbLogo} alt="" /> //jakaś inna ikona
        <textarea type="text" placeholder='Powiedz nam coś o sobie!' onChange={(e) => setDescription(e.target.value)}></textarea>
      </div> */}
      {/* <h4>Podaj nam kontakt do siebie!</h4>
      <input type="text" placeholder='link do Twojego profilu na Facebooku' onChange={
        (e) => setFacebook(e.target.value)
      }></input> */}
      <div className="center-content">
        <button className="action-button" onClick={(e) => handleChangeSocial(e)}>{user?.socialContact ? 'Zmień' : 'Zatwierdź'}</button>
        <button className="action-button" onClick={() => navigate('/')}>Menu</button>
      </div>
    </form>
  </div>
)
}

export default AddFacebook