import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

let mapStateToProps = (state) => {
    return {
        isAuth:  state.auth.isAuth
    }
}

export const withProfileRedirect = (Component) => {

    let RedirectComponent = (props) => {
        if(props.isAuth) return <Redirect to='/profile'/>
        return <Component {...props} />
    }

    let ProfileRedirectConnect = connect(mapStateToProps)(RedirectComponent);

    return ProfileRedirectConnect;
}
