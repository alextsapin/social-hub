import React from 'react';
import {NavLink} from 'react-router-dom';
import {authThunkCreator} from '../../redux/auth-reducer.js';
import {connect} from 'react-redux';

const Header = (props) => {
    return (
        <header>
            {props.isAuth ? props.login:
            <NavLink to="/login">Login</NavLink>}
        </header>
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