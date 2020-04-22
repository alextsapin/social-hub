import React from 'react';
import {BrowserRouter, Route, NavLink, Link, Switch} from 'react-router-dom';

// IMAGES
import arrow from '../../images/arrow.png';
import profile from '../../images/profile.png';
import friends from '../../images/friends.png';
import dialogs from '../../images/dialogs.png';
import photos from '../../images/photos.png';
import settings from '../../images/settings.png';

const Sidebar = () => {
    return (
        <aside>
            <div className="panelbox">
                <ul className="panelbox__list">
                    <li className="panelbox__item">
                        <NavLink exact to="/profile" className="panelbox__link">
                            My Profile <img src={profile}/>
                        </NavLink>
                    </li>

                    <li className="panelbox__item">
                        <NavLink className="panelbox__link" to="/chat">
                            Chat <img src={dialogs}/>
                        </NavLink>
                    </li>

                    <li className="panelbox__item">
                        <NavLink className="panelbox__link" to="/users">Users <img src={friends}/></NavLink>
                    </li>
                    
                    <li className="panelbox__item">
                        <NavLink className="panelbox__link" to="#">Photos <img src={photos}/></NavLink>
                    </li>

                    <li className="panelbox__item">
                        <NavLink className="panelbox__link" to="#">Settings <img src={settings}/></NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;