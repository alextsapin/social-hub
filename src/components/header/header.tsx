import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import ImageLoader from 'react-imageloader';
import {logoutTC} from '../../redux/reducers/auth';
import spinner from '../spinners/imageSpinner';

// IMG
import logo from '../../images/logo.png';

import {userIdSelector, isAuthSelector, userLoginSelector} from '../../redux/selectors/auth';

// StateType
import {appStateType} from '../../redux/store';

// Icons
import {HouseIcon, PeopleIcon, ChatIcon, LoginIcon, LogoutIcon} from '../../icons/icons';

type propsType = mapStatePropsType & mapDispatchPropsType;

type mapDispatchPropsType = {
    logoutTC: () => void;
}

type mapStatePropsType = {
    id: number;
    isAuth: boolean;
    login: string;
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
                                <HouseIcon/>
                                <span>Home</span>
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

const HeaderServer = (props: propsType) => {
    return <Header {...props}/>
}

const mapStateToProps = (state: appStateType): mapStatePropsType => ({
    id: userIdSelector(state),
    isAuth: isAuthSelector(state),
    login: userLoginSelector(state)
});

export default connect<mapStatePropsType, mapDispatchPropsType, unknown, appStateType>(mapStateToProps, {logoutTC})(HeaderServer);