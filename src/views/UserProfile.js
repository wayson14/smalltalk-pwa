import { React, useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';
import { authUserLogout } from '../services/api_methods';
import { UserContext } from '../services/UserContext'
import OutsideClickHandler from 'react-outside-click-handler';
import Square from '../components/Square';
const UserProfile = ({handleClose, userData}) => {

    const navigate = useNavigate();
    const [checked, setChecked] = useState(true);
    const { user, setUser } = useContext(UserContext)
    // const isLoggedin = props.isLoggedin
    // const [display, setDisplay] = useState(true);

    // useEffect(() => {
    //     setDisplay(display => setDisplay(!display))
    // },[checked])

    // style={checked ? {display: "flex"} : {display: "none"}}

    return <div className="viewport-center-content" >
        <OutsideClickHandler
                onOutsideClick={() => {
                    handleClose();
                }}
            >
            <div className="user-profile">
                <img className="profile-avatar" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.DtHViTj3wtToVQA0O9qmbgHaHa%26pid%3DApi&f=1"/>
                    
                <h4 className="profile-username">
                    {userData.username}
                </h4>
                <div className="profile-social">
                    <span>{userData.socialLink && `Kontakt: ${userData.socialLink}`} </span>
                    </div>
                <div className="profile-social">
                    <span>{userData.id && `ID użytkownika: ${userData.id}`} </span>
                    
                </div>
                <div className="profile-social">
                <span>{userData.roomID && `ID pokoju użytkownika: ${userData.roomID}`} </span>
                    </div>
             
                <div className="profile-about">
                    </div>
                <button className="action-button">Edytuj</button>
                <button className="action-button" 
                    onClick={() => {
                        authUserLogout().then(res => setUser(res))
                        setChecked(false)
                        navigate("/login")
                    }
                        }>Wyloguj</button>
                {/* {Object.keys(userData).map((key, index) => {
                    return <span>{userData[key]}</span>
                })} */}
                
            </div>
        </OutsideClickHandler>
    </div>
    {/* </div> */ }



};

export default UserProfile;