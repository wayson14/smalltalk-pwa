import { React, useState, useEffect, useContext } from 'react';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { createCircle, parseResponseToInfo, parseErrorToInfo } from '../services/api_methods';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom/cjs/react-dom.development';
import { InfoContext } from '../services/InfoContext';
import { UserContext } from "../services/UserContext";
import { useNavigate } from "react-router-dom";

const CreateCircle = () => {
  const [show, setShow] = useState(true);
  const [circleBody, setCircleBody] = useState({})
  const { info, setInfo } = useContext(InfoContext);
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate()

  const createCircleHandler = (e) => {
    e.preventDefault()
    circleBody.admin_users_IDs = [user.id]
    circleBody.users_IDs = [user.id]
    console.log(circleBody)
    createCircle(circleBody)
    .then(res => {
      console.log(res)
      // res = parseResponseToInfo(res)
      setInfo({
        text: `Pomyślnie stworzono krąg "${res.name}". Można się do niego dołączyć za pomocą kodu: ${res.code}. Jesteś jego pierwszym administratorem.`,
        type: 'info'
      })
      navigate('/circles')
    })
    .catch(err => parseErrorToInfo(err).then(res => setInfo({
      text: res,
      type: 'error'
    })))
  }

  const handleChangeField = (e) => {
    setCircleBody({ ...circleBody, [e.target.name]: e.target.value });
  }


  return (
    <div>
      <TopBar />
      <BottomBar isLoggedin={show} />
      <h1>Stwórz krąg</h1>
      <div className='Create-cricle-view' onClick={() => setShow(false)} >

        <form>
          {/* <PopUp head2={"Ta funkcja będzie dostępna w pełnej wersji aplikacji"} clas={'chatBttns maybeLater'}/> */}
          <input onChange={e => handleChangeField(e)} name="name" type="text" placeholder='Nazwa' onFocus={(e) => setShow(false)} />
          <div className='desciption'>
            <textarea onChange={e => handleChangeField(e)} name="description" className='desciption descc' type="text" placeholder='Opis' maxLength='200' onClick={() => setShow(false)} />
          </div>
          <div className='time'>
            <input onChange={e => handleChangeField(e)} name="max_users" type="text" pattern="\d*" placeholder='Ilość użytkowników' maxLength='3' onClick={() => setShow(false)} />
            <input onChange={e => handleChangeField(e)} name="expire_date" type="datetime-local" pattern="\d*" placeholder='Dni do wygaśnięcia' maxLength='3' onClick={() => setShow(false)} />
          </div>
          <button onClick={(e) => createCircleHandler(e)}>STWÓRZ</button>
        </form>
      </div>

    </div>
  )
}

export default CreateCircle