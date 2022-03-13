import {React,useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {authUserLogout} from '../services/api_methods';
import { UserContext } from '../services/UserContext';

const PopUp = (props) => {
const { user, setUser } = useContext(UserContext);
const setShow = props.setShow;
const head = props.head;
const head1 = props.head1;
const head2 = props.head2;
const description = props.description;
const users = props.users;
const userInfo = props.userInfo;
const expires = props.expires;
const expiresInfo = props.expiresInfo;
const instaInfo = props.instaInfo;
const fbInfo = props.fbInfo;
const avatar = props.avatar;
const clas = props.clas;
const imagine = props.imagine;
const imagine2 = props.imagine2;
const imagine3 = props.imagine3;
const imagine4 = props.imagine4;
const bttn = props.bttn;
const funCtion = props.funCtion;
const funCtion1 = props.funCtion1;

const logout = () => {
    authUserLogout()
        .then(() => setUser(''))
    console.log('logout');
}
const navigate = useNavigate(); 
const chatExit = () => {
const path = `/chat`; 
navigate(path);
}

return <div>
<div className='popUp'>
    <div className='window' id="nieodda">
        <div className={clas} id='odda'>
                <div className='bc'>
                <img src={avatar} className="avatar" />
                </div>
                <div className='chatBttns' id='odda'>
                    <h1>{head2}</h1>
                    <div className='bttnsColor'>
                    <button onClick={()=> {
                        funCtion1()
                        setShow(false)}} id='ree' className='reaveael'>ODKRYJ</button>
                    <button id='odda'>KONTYNUUJ</button>
                    </div>
                </div>
                    <h1 className='user' >{head1}</h1>
                    <h1>{head}</h1>
                    <p className='des' >{description}</p>
                    <h3 className='users' >{users}</h3>
                    <p>{userInfo}</p>
                <div className='fb'>
                    <img src={imagine3} alt=""/>
                    <p>{fbInfo}</p>
                </div>
                <h3>{expires}</h3>
                <div className='insta' >
                    <img src={imagine4} alt=""/>
                    <p>{instaInfo}</p>
                    <img src={imagine} id="nieodda" alt=""/>
                    <img onClick={()=> funCtion()} src={imagine2} alt=""  className='better'/>
                </div>
                <div className='logOut'>
                    <button onClick={()=> logout()} >{bttn}</button>
                </div>
                <p>{expiresInfo}</p>
        </div>
    </div>
</div>
</div>
};

export default PopUp;