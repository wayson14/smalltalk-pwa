import {React,useState} from 'react';
import {Link } from "react-router-dom";
import OutsideClickHandler from 'react-outside-click-handler';
import arrowLogo from './loginIcon/Arrow 4.svg';

const BottomBar = (props) => {
    const [checked, setChecked] = useState(false);
    const isLoggedin = props.isLoggedin
        return <div>
        <OutsideClickHandler
            
          onOutsideClick={() => {
           setChecked(false);
          }}
        >
            <input readOnly id="bttn" type="checkbox" className="burger" checked={checked}/>
            <div className="Bottom-header App-header">
                <label htmlFor="bttn" id="expand-btn" onClick={() => checked?setChecked(false):setChecked(true)}><img src={arrowLogo} alt="" className="image"/></label>
                <Link className="nav-item" to="/circles">Moje Kręgi</Link>
                <Link className="nav-item" to="/createCircle">Stwórz krąg</Link>
                <Link className="nav-item" to="/friends">Znajomi</Link>
            </div>
        </OutsideClickHandler>
        </div>
};

export default BottomBar;