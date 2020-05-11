import React from 'react';
import {NavLink} from 'react-router-dom';
import {authThunkCreator} from '../../redux/reducers/auth.js';
import {connect} from 'react-redux';

import logo from '../../images/logo.png';

const Header = (props) => {
    return (
        <div className="navbar navbar-expand-lg navbar-dark bg-secondary">
            <NavLink className="navbar-brand" to="/"><img className="logo" src={logo}/></NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav m-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">Login <span class="sr-only">(current)</span></NavLink>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/settings">Settings <span class="sr-only">(current)</span></NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

class HeaderServer extends React.Component {
    componentDidMount() {
        this.props.authThunkCreator();
    }

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login:  state.auth.login
});


export default connect(mapStateToProps, {authThunkCreator})(HeaderServer);