import { React, useState, useContext, useEffect } from 'react';
import { UserContext } from '../services/UserContext';
import { joinCircle, getCircle } from '../services/api_methods'
import { request } from 'websocket';

const Circles = () => {
  const { user, setUser } = useContext(UserContext);
  const [circleCode, setCircleCode ] = useState('')
  const [ circles, setCircles ] = useState([])


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

  useEffect(() => {
    if(Array.isArray(user.circlesIDs)){
      user.circlesIDs.map(circleID => {
        getCircle(circleID)
          .then(circleData => setCircles(circles => {
            return [...circles, circleData]
          }))
      })
    } 
  }, [user])

  return <div>
    <form>
      <input type="text" placeholder="kod" onChange={
        (e) => {setCircleCode(() => e.target.value)
        }
      }></input>
      <button onClick={
        (e)=>{
          //to będzie robione w Django
          e.preventDefault();
          
          
    
          joinCircle(circleCode)
            .then(circleID => {
              if (user.circlesIDs){
                if(user.circlesIDs.indexOf(circleID) > -1){
                  alert('Dołączono już do tego kręgu!')
                  return
                }
                  
              }
              let IDs = [];
              {Array.isArray(user.circlesIDs) ?
                IDs = [...user.circlesIDs, circleID]
                :
                IDs = [circleID]
              }
              setUser(user => ({
                ...user,
                circlesIDs : IDs, 
              }))
            })
            .catch(err => console.log(err)) }
      }>
        dołącz do kręgu
      </button>
    </form>
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
    <pre>
      {circles.map(circle => {
        return (
            <div key={circle.circle_ID} className="container vertical">
              <h2>{circle.name}</h2>
              <ol>
                <li>{circle.localization}</li>
                <li>{circle.description}</li>
                <li>{circle.expire_date}</li>
              </ol>
            </div>
        )
      }
      )
      }
      
    </pre>
  </div>;
};

export default Circles;
