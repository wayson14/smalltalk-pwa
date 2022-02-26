import {React, useState} from 'react'
import Square from '../components/Square'
const Test = ({counter, setCounter}) => {
  const [show, setShow] = useState(false);
  return (
      <>
    <div>Test</div>
    <button onClick={() => setCounter(counter++)}>++</button>
    <button onClick={() => setShow(true)}>show</button>
    {show && <Square show={show} setShow={setShow}></Square>}
    </>
  )
}

export default Test