import { React, useState, useContext, useEffect } from 'react';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { UserContext } from '../services/UserContext';
import { joinCircle, leaveCircle, getCircle, getUserCirclesIDs } from '../services/api_methods'
import useAsyncState from '../services/useAsyncState';

const Circles = () => {
  const [ circles, setCircles ] = useAsyncState([])
  let reload = 1
  useEffect(() => {
    getUserCirclesIDs()
    // .then(data => setCircles(data))
    // .then(data => console.log(data))
    .then(data => {
      data.message.map((id => {
        getCircle(id)
        .then(fetchedCircle => setCircles(circles => [...circles, fetchedCircle]))
      }))
    })
    .catch(err => console.error(err))
    // pobieranie informacji o kręgach użytkownika
  }, [reload])

  // const circles = [
  //   {
  //     name : "wiśniowa",
  //     id: 0,
  //     expires: "21.04.2333",
  //     background_img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fm50.targeo.pl%2Fi%2Fcache%2Fstatic%2Fbudyneksat%2Fwi%2Fwarszawa%2B02-520%2Cwisniowa%2C56.jpg&f=1&nofb=1"
  //   },
  //   {
  //     name : "wisiniowa",
  //     id : 1,
  //     expires: "21.04.2333",
  //     background_img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fm50.targeo.pl%2Fi%2Fcache%2Fstatic%2Fbudyneksat%2Fwi%2Fwarszawa%2B02-520%2Cwisniowa%2C56.jpg&f=1&nofb=1"
  //   },
  //   {
  //     name : "wiśniówa",
  //     id: 2,
  //     expires: "21.04.2333",
  //     background_img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fm50.targeo.pl%2Fi%2Fcache%2Fstatic%2Fbudyneksat%2Fwi%2Fwarszawa%2B02-520%2Cwisniowa%2C56.jpg&f=1&nofb=1"
  //   },
  // ]



  return <>
    <TopBar/>
    <div className="circles-container">
    {/* <pre>
      {circles.map((circle) => {
        return(
        <div key={circle.id} className="container vertical">

          <img src={circle.background_img} width="300px"/>
          <span>{circle.name}</span>
          <span>{circle.expires}</span>
          <br></br>
        </div>
        )
      })}
    </pre> */}
      {circles.length > 0 ? circles.map(circle => {
        return (
            <div key={circle.circle_ID} className="circles-container">
              <h2>{circle.name}</h2>
              <div className="content-container">
                <span>{`Lokalizacja: ${circle?.localization}`}</span>
                <span>{`Opis: ${circle?.description}`}</span>
                <span>{`Data wygaśnięcia kodu: ${circle?.expire_date}`}</span>
              </div>
              <button className="leave-circle-button" onClick={() => leaveCircle(circle.circle_ID)
                .then(res => {
                  console.log(res)
                  return setCircles([])
                })
                .then(res => {
                  reload *= -1
                  })}>opuść krąg</button>
            </div>
        )
      }
      
      )
      : 
        <h1 className="bold-header"> Jeszcze nie jesteś w żadnym kręgu! </h1>
      }
      
    <BottomBar/>
  </div>;
  </>
};

export default Circles;
