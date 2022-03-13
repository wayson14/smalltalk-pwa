import {React,useState,useContext} from 'react';
import {Link } from "react-router-dom";
import PopUp from './PopUp';
import { UserContext } from '../services/UserContext';
import userLogo from './loginIcon/Avatar.svg';
import logo from './loginIcon/Warstwa 1.svg';
import homeLogo from './loginIcon/homeLogo.svg';
import fbLogo from './loginIcon/fb.svg';
import instLogo from './loginIcon/instagram.svg';
import UserProfile from './UserProfile';

const TopBar = (props) => {
    const [ showProfile, setShowProfile ] = useState(false);
    const { user, setUser } = useContext(UserContext);

    const toggleProfile = () => {
        setShowProfile(showProfile => !showProfile)
    }
    return <div className = "top-bar-wrapper" 
    // onClick={(e) => {setShowProfile(false)}}
    >
    <header className="top-bar">
        <Link to="/" onClick={() => setShowProfile(setShowProfile(false))}><img src={homeLogo} alt="" className="homeLogo"/></Link>
        <h4 className='logo'><Link to="/chat" className='logo'><img src={logo} alt="" /></Link></h4>
        <img src={userLogo} alt="" className="image" onClick={() => setShowProfile(showProfile => setShowProfile(!showProfile))}/>
        {/* <Link className="nav-item" to="/admin">admin</Link> */}
        {/* <span className="nav-item">{user.username}</span> */}
    </header>
    {/* {showProfile && <PopUp show={show} setShow={setShow} avatar={userLogo} head1={`${user.username}#${user.id}`} imagine3={fbLogo} imagine4={instLogo} instaInfo={"Szymon Kowal"} fbInfo={"Szymon Kowal"} bttn={"Wyloguj się"} clas={'profile contentt'}/>} */}
    {showProfile && <UserProfile handleClose={toggleProfile} userData={user}/>}
    {showProfile && console.log('PROFIL')}
    </div>
};

export default TopBar;