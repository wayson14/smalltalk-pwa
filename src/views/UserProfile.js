import { React, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import OutsideClickHandler from 'react-outside-click-handler';
import Square from '../components/Square';

const UserProfile = ({handleClose, userData}) => {
    const [checked, setChecked] = useState(true);
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
                <div classname="profile-social">
                    </div>
                <div classname="profile-about">
                    </div>
                <button className="action-button">Edytuj</button>
                {/* {Object.keys(userData).map((key, index) => {
                    return <span>{userData[key]}</span>
                })} */}
                
            </div>
        </OutsideClickHandler>
    </div>
    {/* </div> */ }



};

export default UserProfile;