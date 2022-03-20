import {React} from 'react'
import { useNavigate } from 'react-router'

const NIY = () => {
    const navigate = useNavigate();
  return (
      <>
    <div className='NIY'>
      <div className="center-content"><h1>TRWAJĄ PRACE <br/> ⛔</h1>
      <button className="action-button" onClick={() => {navigate("/")}}>Powrót</button>
      </div>
    </div>
  </>
  )
}

export default NIY