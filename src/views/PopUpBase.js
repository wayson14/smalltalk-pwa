import { React, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';
import OutsideClickHandler from 'react-outside-click-handler';
import { generateNewCircleCode } from '../services/api_methods';


const UserProfile = ({ handleClose,
    onYes,
    onNo,
    type,
    prompt,
    revealObject,
    props
}) => {

    const navigate = useNavigate();
    const [checked, setChecked] = useState(true);


    return <div className="viewport-center-content" >
        <OutsideClickHandler
            onOutsideClick={() => {
                handleClose();
            }}
        >
            <div className="pop-up-base">
                {type === 'choice' && <>
                    <h2>{prompt}</h2>
                    <div className="choice-button-container">
                        <button className="action-button" onClick={() => {
                            onYes()
                            handleClose()
                        }}>Tak</button>
                        <button className="action-button" onClick={onNo}>Nie</button>

                    </div>
                </>}
                
                {type === 'change-expire-date' && <div className="">
                    <form>
                        <input type="datetime-local"></input>
                        <button onClick={(e) => {
                            e.preventDefault()
                            let date = e.target.parentElement[0].value
                            date = date.replace('T', '-').replace(':', '-') + '-00'
                            generateNewCircleCode(props.circleID, date)
                            
                        console.log(date)}}>Zatwierdź</button>
                    </form>
                </div>}

                {type === 'rejected-view' && <div className="">
                    <h2>Nie tym razem... Spróbuj jeszcze raz!</h2>
                    <div choice-button-container>
                        <button className="action-button" onClick={() => navigate("/")}>Powrót do menu głównego</button>
                    </div>
                </div>}

                {type === 'revealed-view' && <div className="pop-up-container">
                    <h2 className="bold-header">Gratulacje! Właśnie poznałeś: </h2>

                    {/* <img className="profile-avatar" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.DtHViTj3wtToVQA0O9qmbgHaHa%26pid%3DApi&f=1" /> */}

                    <h4 className="profile-username">
                        {revealObject.u1}
                    </h4>
                    <h4 className="profile-username">
                        &
                    </h4>
                    <h4 className="profile-username">
                        {revealObject.u2}
                    </h4>
                    <div className="profile-social">
                        {revealObject.s1}
                    </div>
                    <div className="profile-social">
                        {revealObject.s2}
                    </div>
                    <div className="profile-about">
                    </div>
                    <button className="action-button reavel" onClick={() => navigate("/")}>Powrót</button>
              
                </div>}
            </div>
        </OutsideClickHandler>
    </div>
    {/* </div> */ }



};

export default UserProfile;