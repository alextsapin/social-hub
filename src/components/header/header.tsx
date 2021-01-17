import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import ImageLoader from 'react-imageloader';
import {logoutTC} from '../../redux/reducers/auth';
import spinner from '../spinners/imageSpinner';

// Material — UI
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import TextsmsIcon from '@material-ui/icons/Textsms';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// IMG
import logo from '../../images/logo.png';

import {userIdSelector, isAuthSelector, userLoginSelector} from '../../redux/selectors/auth';

// StateType
import {AppStateType} from '../../redux/store';

type propsType = mapStatePropsType & mapDispatchPropsType;

type mapDispatchPropsType = {
    logoutTC: () => void;
}

type mapStatePropsType = {
    id: null | number;
    isAuth: boolean;
    login: null | string;
}

const Header = (props: propsType) => {
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
                        {
                            !   props.isAuth
                            ?   <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">
                                        <VpnKeyIcon className="mb-1 mr-1"/>
                                        Login
                                    </NavLink>
                                </li>
                            :   <li className="nav-item">
                                    <button onClick={props.logoutTC} className="nav-link">
                                        <ExitToAppIcon className="mb-1 mr-1"/>
                                        Logout
                                    </button>
                                </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

const HeaderServer = (props: propsType) => {
    return <Header {...props}/>
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => ({
    id: userIdSelector(state),
    isAuth: isAuthSelector(state),
    login: userLoginSelector(state)
});

export default connect<mapStatePropsType, mapDispatchPropsType, unknown, AppStateType>(mapStateToProps, {logoutTC})(HeaderServer);