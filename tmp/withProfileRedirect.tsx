import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {appStateType} from '../redux/store';

type MapStatePropsType = {
    isAuth: boolean
}

let mapStateToProps = (state: appStateType) => {
    return {
        isAuth:  state.auth.isAuth
    }
}

export function withProfileRedirect<WCP> (WrappedComponent: React.ComponentType<WCP>) {

    function RedirectComponent(props: MapStatePropsType) {
        let {isAuth, ...restProps} = props
        if(!isAuth) return <Redirect to='/profile'/>
        return <WrappedComponent {...restProps as WCP} />
    }

    return connect(mapStateToProps)(RedirectComponent);
}