import {React,useState} from 'react';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import PopUp from './PopUp';


const CreateCircle = () => {
  const [show, setShow] = useState(true);
  return (
  <div>
      <TopBar/>
      <BottomBar isLoggedin={show}/>
      <h1>Stwórz krąg</h1>
      <div className='Cricles' onClick={()=>setShow(false)} >
        <PopUp head2={"Ta funkcja będzie dostępna w pełnej wersji aplikacji"} clas={'chatBttns maybeLater'}/>
        <input type="text" placeholder='Nazwa' onFocus={(e)=>setShow(false) } />
        <div className='desciption'>
          <textarea className='desciption descc' type="text" placeholder='Opis' maxLength='200' onClick={()=>setShow(false)}/>
        </div>
        <div className='time'>
        <input type="text" pattern="\d*" placeholder='Ilość użytkowników' maxLength='3'onClick={()=>setShow(false)}/>
        <input type="text" pattern="\d*" placeholder='Dni do wygaśnięcia' maxLength='3'onClick={()=>setShow(false)}/>
      </div>
        <button>STWÓRZ</button>
      </div>
  </div>
  )
}

export default CreateCircle