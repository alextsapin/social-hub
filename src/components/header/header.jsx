import React from 'react';
import {NavLink} from 'react-router-dom';
import * as axios from 'axios';
import {setAuthUserData} from '../../redux/auth-reducer.js';
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
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true}).then(response => {
            if(response.data.resultCode === 0) {
                let {userId, email, login} = response.data.data;
                this.props.setAuthUserData(userId, email, login);
            }
        });
    }

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login:  state.auth.login
});


export default connect(mapStateToProps, {setAuthUserData}) (HeaderServer);