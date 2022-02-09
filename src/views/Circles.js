import React from 'react';

const Circles = () => {
  const circles = [
    {
      name : "wiśniowa",
      id: 0,
      expires: "21.04.2333",
      background_img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fm50.targeo.pl%2Fi%2Fcache%2Fstatic%2Fbudyneksat%2Fwi%2Fwarszawa%2B02-520%2Cwisniowa%2C56.jpg&f=1&nofb=1"
    },
    {
      name : "wisiniowa",
      id : 1,
      expires: "21.04.2333",
      background_img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fm50.targeo.pl%2Fi%2Fcache%2Fstatic%2Fbudyneksat%2Fwi%2Fwarszawa%2B02-520%2Cwisniowa%2C56.jpg&f=1&nofb=1"
    },
    {
      name : "wiśniówa",
      id: 2,
      expires: "21.04.2333",
      background_img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fm50.targeo.pl%2Fi%2Fcache%2Fstatic%2Fbudyneksat%2Fwi%2Fwarszawa%2B02-520%2Cwisniowa%2C56.jpg&f=1&nofb=1"
    },
  ]
  return <div>
    <pre>
      {circles.map((circle) => {
        return(
        <div className="container vertical">
          {console.log(circle)}
          <img src={circle.background_img} width="300px"/>
          <span>{circle.name}</span>
          <span>{circle.expires}</span>
          <br></br>
        </div>
        )
      })}
    </pre>
  </div>;
};

export default Circles;
