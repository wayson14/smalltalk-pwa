import {React,useEffect,useState} from 'react';
import {Link } from "react-router-dom";
import OutsideClickHandler from 'react-outside-click-handler';
import arrowLogo from './loginIcon/Arrow 4.svg';

const BottomBar = () => {
    const [checked, setChecked] = useState(false);
    // const isLoggedin = props.isLoggedin
    // const [display, setDisplay] = useState(true);
    
    // useEffect(() => {
    //     setDisplay(display => setDisplay(!display))
    // },[checked])

        return <OutsideClickHandler
            onOutsideClick={() => {
            setChecked(false);
            }}
            >
                {/* {showBottomBar && <div onClick={() => setShowBottomBar(false)}>"JESTEM"</div>} */}
                {/* <input readOnly id="bttn" type="checkbox" className="burger" checked={checked}/> */}
                <div className="bottom-bar">

                    <label htmlFor="bttn" 
                    id="expand-btn" 
                    onClick={() => setChecked(checked => !checked)}><img src={arrowLogo} alt="" 
                    className={checked ?  "normal-arrow" : "flipped-arrow"}/>
                    </label>

                    <div className="bottom-bar-list" style={checked ?  {display: 'flex'} : {display: 'none'}}>
                        <Link className="nav-item" to="/circles">Moje Kręgi</Link>
                        <Link className="nav-item" to="/createCircle">Stwórz krąg</Link>
                        <Link className="nav-item" to="/friends">Znajomi</Link>
                    </div>
                </div>
            </OutsideClickHandler>
            
};

export default BottomBar;