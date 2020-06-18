import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import ImageLoader from 'react-imageloader';
import {logoutTC} from '../../redux/reducers/auth.js';
import spinner from '../spinner/spinner.jsx';

// IMG
import logo from '../../images/logo.png';

// Icons
import {HouseIcon, PeopleIcon, PersonIcon, ChatIcon, LoginIcon, LogoutIcon} from '../../icons/icons.js';

const Header = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-xl">
                <NavLink className="navbar-brand" to="/">
                    <ImageLoader className="logo" src={logo} wrapper={React.createFactory('div')} preloader={spinner}></ImageLoader>
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/">
                                <HouseIcon/>
                                <span>Home</span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/profile/2">
                                <PersonIcon/>
                                <span>Dmytry</span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/users">
                                <PeopleIcon/>
                                <span>Users</span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/chat">
                                <ChatIcon/>
                                <span>Chat</span>
                            </NavLink>
                        </li>
                    </ul>

                    <ul className="navbar-nav ml-auto">
                        {
                            !   props.isAuth
                            ?   <li className="nav-item">
                                    <NavLink className="nav-link" to="/login"><LoginIcon/>Login</NavLink>
                                </li>
                            :   <li className="nav-item">
                                    <button onClick={props.logoutTC} className="nav-link"><LogoutIcon/>Logout</button>
                                </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

const HeaderServer = (props) => {
    
    return <Header {...props}/>
}

const mapStateToProps = (state) => ({
    id:     state.auth.id,
    isAuth: state.auth.isAuth,
    login:  state.auth.login
});

export default connect(mapStateToProps, {logoutTC})(HeaderServer);