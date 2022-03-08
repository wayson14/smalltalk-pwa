import { React, useContext, useState, useEffect } from 'react'
import { UserContext } from '../services/UserContext';
import { InfoContext } from '../services/InfoContext';

const InfoCloud = () => {
    const { user, setUser } = useContext(UserContext);
    const { info, setInfo } = useContext(InfoContext);
    const [ hover, setHover ] = useState(true);
    let style = {
        info: {
            backgroundColor: "lightblue"
        },
        success: {
            backgroundColor: "lightgreen"
        },
        error: {
            backgroundColor: "red"
        },
        display: {
            display: "block"
        },
        hide: {
            display: "none"
        }
    }

    useEffect(() => {
        console.log(hover)
        if (!hover){
            info.type = 'info';
            info.text = '';
            setHover(hover => !hover)
                
        }
    }, [hover])

  return (
    <div 
    onClick ={() => setHover(hover => !hover)}
    
     style={info.text ? style.display : style.hide}>
        <div style={style[info.type]} className="info-cloud">
            {info.text}
        </div>
    </div>
  )
}

export default InfoCloud