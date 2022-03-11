import {React} from 'react'
import { useNavigate } from 'react-router'

const NIY = () => {
    const navigate = useNavigate();
  return (
      <>
    <div className="center-content"><h1>Not implemented yet!</h1>
    <button className="action-button" onClick={() => {navigate("/")}}>Powrót</button>
    </div>
  </>
  )
}

export default NIY