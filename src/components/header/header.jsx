import React from 'react';
import {NavLink} from 'react-router-dom';
import {authThunkCreator} from '../../redux/auth-reducer.js';
import {connect} from 'react-redux';

import logo from '../../images/logo.png';

const Header = (props) => {
    return (
        <div class="navbar navbar-expand-lg navbar-dark bg-secondary">
            <a class="navbar-brand" href="/"><img className="logo" src={logo}/></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link disabled" href="#">Disabled</a>
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