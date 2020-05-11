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
                    <NavLink exact to="/profile/7020" className="panelbox__link" activeClassName="panelbox__link_active">
                        My profile <img src={profile}/>
                    </NavLink>
                </li>

                <li className="panelbox__item">
                    <NavLink className="panelbox__link" activeClassName="panelbox__link_active" to="/profile/2">
                        Dmitry <img src={settings}/>
                    </NavLink>
                </li>

                <li className="panelbox__item">
                    <NavLink className="panelbox__link" activeClassName="panelbox__link_active" to="/chat">
                        Chat <img src={dialogs}/>
                    </NavLink>
                </li>

                <li className="panelbox__item">
                    <NavLink className="panelbox__link" activeClassName="panelbox__link_active" to="/users">
                        Users <img src={friends}/>
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;