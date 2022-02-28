import {React, useState} from 'react'
import Square from '../components/Square'
const Test = ({counter, setCounter}) => {
  const [show, setShow] = useState(false);

  function randomNotification() {

    const notifBody = `Created by me.`;
    const notifImg = `data/img/lol.jpg`;
    const options = {
      body: notifBody,
      icon: notifImg,
    };
    new Notification('test', options);
  }

  return (
      <>
    {/* <div>Test</div>
    <button onClick={() => setCounter(counter++)}>++</button>
    <button onClick={() => setShow(true)}>show</button>
    {show && <Square show={show} setShow={setShow}></Square>} */}
    <button onClick={
      () => {
        Notification.requestPermission().then((result) => {
          if (result === 'granted') {
            randomNotification();
          }
        })
      }
    }>zezwol</button>
    <button onClick={
      () => {
        randomNotification()
      }
    }>notyfikacja</button>


    {/* const button = document.getElementById('notifications');
    button.addEventListener('click', () => {
      Notification.requestPermission().then((result) => {
    if (result === 'granted') {
      randomNotification();
    }
  });
}) */}
    </>
  )
}

export default Test