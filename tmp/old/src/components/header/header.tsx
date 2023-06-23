import React from 'react';
import {NavLink} from 'react-router-dom';
import ImageLoader from 'react-imageloader';
import {useSelector, useDispatch} from 'react-redux';

// IMG
import logo from '../../images/logo.png';
import spinner from '../spinners/imageSpinner';

// Selectors
import {isAuthSL} from '../../redux/selectors/auth';

// ThunkCraators
import {logoutTC} from '../../redux/reducers/auth';

// Material — UI
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import TextsmsIcon from '@material-ui/icons/Textsms';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Login = () => {
	return (
        <li className="nav-item">
            <NavLink className="nav-link" to="/login">
                <VpnKeyIcon className="mb-1 mr-1"/>Login
            </NavLink>
        </li>
	);
};

const Logout = () => {

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logoutTC())
    }

	return (
        <li className="nav-item">
            <button onClick={onLogout} className="nav-link">
                <ExitToAppIcon className="mb-1 mr-1"/>Logout
            </button>
        </li>
	);
};

const Header = () => {

    const isAuth = useSelector(isAuthSL);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
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
                                <HomeIcon className="mb-1 mr-1"/>
                                <span>Home</span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/users">
                                <PeopleIcon className="mb-1 mr-1"/>
                                <span>Users</span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/chat">
                                <TextsmsIcon className="mr-1"/>
                                <span>Chat</span>
                            </NavLink>
                        </li>
                    </ul>

                    <ul className="navbar-nav ml-auto">
                        {!isAuth ? <Login/> : <Logout/>}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;