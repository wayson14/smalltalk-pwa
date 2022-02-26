import {useState, React} from 'react'

const Square = ({show, setShow}) => {
   
  return (
      <div className="container square vertical centered" 
      onClick={(e) => {e.target.id !== 'keep' && setShow(false)}}>

    <div id='keep'  className="inner-square">Square</div>
    </div>)
}

export default Square