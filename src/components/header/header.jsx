import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import ImageLoader from 'react-imageloader';
import {authTC, logoutTC} from '../../redux/reducers/auth.js';
import spinner from '../spinner/spinner.jsx';

import logo from '../../images/logo.png';

const Header = (props) => {
    return (
        <div className="navbar navbar-expand-lg navbar-dark bg-secondary">
            <NavLink className="navbar-brand" to="/">
                <ImageLoader className="logo" src={logo} wrapper={React.createFactory('div')} 
                    preloader={spinner}></ImageLoader></NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    {
                        !  props.isAuth
                        ? <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
                        : <li className="nav-item"><button onClick={props.logoutTC} className="btn btn-warning">Logout</button></li>
                    }
                </ul>
            </div>
        </div>
    );
}

class HeaderServer extends React.Component {
    componentDidMount() {
        this.props.authTC();
    }

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state) => ({
    id:     state.auth.id,
    isAuth: state.auth.isAuth,
    login:  state.auth.login
});

export default connect(mapStateToProps, {authTC, logoutTC})(HeaderServer);