import { React, useState, useContext, useEffect } from 'react';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { UserContext } from '../services/UserContext';
import { joinCircle, removeCircle, leaveCircle, getCircle, getUserCirclesIDs, generateNewCircleCode } from '../services/api_methods'
import useAsyncState from '../services/useAsyncState';
import PopUpBase from './PopUpBase';

const Circles = () => {
  const [circles, setCircles] = useAsyncState([])
  const [targetCircleID, setTargetCircleID] = useState()
  const [showChangeDate, setShowChangeDate] = useState(false)
  const { user, setUser } = useContext(UserContext);
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
    <TopBar />
    <div className="Circles-view">
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
              <span>{`Kod dołączeniowy: ${circle?.code}`}</span>
              {/* <span>{`ID: ${circle?.circle_ID}`}</span> */}
              {/* <span>{`Admini: ${circle?.admin_users_IDs}`}</span> */}
              {circle.admin_users_IDs.indexOf(user.id) > -1 && (
                <>
                <h4>Jesteś administratorem tego kręgu.</h4>
                <div className="circle-admin-section">
                  
                  <button className="action-button" onClick={() => {
                    
                    removeCircle(circle.circle_ID)
                    let c = circles.filter(el => el.circle_ID !== circle.circle_ID)
                    return setCircles(c)
                    
                  }
                  }>Usuń</button>

                  <button className="action-button" onClick={() => {
                    setTargetCircleID(circle.circle_ID)
                    setShowChangeDate(true)
                  }
                  }>Nowy kod</button>
                </div>
                </>
              )}
            </div>
            <button className="leave-circle-button" onClick={() => leaveCircle(circle.circle_ID)
              .then(res => {
                console.log(res)
                let c = circles.filter(el => el.circle_ID !== circle.circle_ID)
                return setCircles(c)
              })
              .then(res => {
                // reload *= -1
              })}>Opuść krąg</button>
          </div>
        )
      }

      )
        :
        <h1 className="bold-header"> Jeszcze nie jesteś w żadnym kręgu! </h1>
      }
      {showChangeDate && <PopUpBase type="change-expire-date" 
                    onYes={generateNewCircleCode}
                    props={
                      {
                        circleID:  targetCircleID
                      }
                     }
                    handleClose={() => setShowChangeDate(!showChangeDate)}>
                  </PopUpBase>}
      <BottomBar />
    </div>;
  </>
};

export default Circles;
