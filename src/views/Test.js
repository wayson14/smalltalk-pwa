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
    const toParse = {'message': '#002 u1:{res[0].username} s1:{res[0].social_link} u2:{res[1].username} s2:{res[1].social_link}'}
    const re = /#002 users reveal themselves\. user1:\{[^}]*\} social_link1:\{[^}]*\} user2:\{[^}]*\} social_link2:\{[^}]*\}/
    
    function parseRevealMessage(input){
      //#TODO: to zrobić regexem, bo aż wstyd 
      let revealObject = {}
      let data = input.message
      const words = data.split(' ').slice(0, data.length);
      
      let good_words = words.filter((w) => {
        return w[0] === 'u' || 's' //username & social_link (database props)
      }) 
      let pairs =  good_words.map(p => {
        return p.split(':').slice()
      })
      pairs.shift()

      //#TODO: Zrobić to za pomocą array funcs
      let obj = {
        [pairs[0][0]]: pairs[0][1],
        [pairs[1][0]]: pairs[1][1],
        [pairs[2][0]]: pairs[2][1],
        [pairs[3][0]]: pairs[3][1],
        // [pairs[4][0]]: pairs[4][1],
      }
      return obj
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

    <button onClick={ () => console.log(parseRevealMessage(toParse))}>parse</button>
    

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