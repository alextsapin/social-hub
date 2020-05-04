import React from 'react';
import {NavLink} from 'react-router-dom';

// IMAGES
import profile from '../../images/profile.png';
import friends from '../../images/friends.png';
import dialogs from '../../images/dialogs.png';
import photos from '../../images/photos.png';
import settings from '../../images/settings.png';

const Sidebar = () => {
    return (
        <aside className="panelbox">
            <ul className="panelbox__list">
                <li className="panelbox__item">
                    <NavLink exact to="/profile/2" className="panelbox__link">
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
                    <NavLink className="panelbox__link" to="/photos">Photos <img src={photos}/></NavLink>
                </li>

                <li className="panelbox__item">
                    <NavLink className="panelbox__link" to="/settings">Settings <img src={settings}/></NavLink>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;