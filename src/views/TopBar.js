import {React,useState} from 'react';
import {Link } from "react-router-dom";
import PopUp from './PopUp';
import userLogo from './loginIcon/Avatar.svg';
import logo from './loginIcon/Warstwa 1.svg';
import homeLogo from './loginIcon/homeLogo.svg';
import fbLogo from './loginIcon/fb.svg';
import instLogo from './loginIcon/instagram.svg';

const TopBar = (props) => {
    const [show, setShow] = useState(false);
    return <div onClick={(e) => {e.target.id === 'nieodda' && setShow(false)}}>
    <header className="App-header">
        <Link className="nav-item" to="/chat"><img src={homeLogo} alt="" className="homeLogo"/></Link>
        <h4 className='logo'><Link to="/chat" className='logo'><img src={logo} alt="" /></Link></h4>
        <img src={userLogo} alt="" className="image" onClick={() => setShow(true)}/>
        {/* <Link className="nav-item" to="/admin">admin</Link> */}
        {/* <span className="nav-item">{user.username}</span> */}
    </header>
    {show && <PopUp show={show} setShow={setShow} avatar={userLogo} head1={"Szymon"} imagine3={fbLogo} imagine4={instLogo} instaInfo={"Szymon Kowal"} fbInfo={"Szymon Kowal"} bttn={"Wyloguj się"} clas={'profile contentt'}/>}
    </div>
};

export default TopBar;