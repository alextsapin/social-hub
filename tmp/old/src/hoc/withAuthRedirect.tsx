import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {AppStateType} from '../redux/store';

type MapStatePropsType = {
    isAuth: boolean
}

let mapStateToProps = (state: AppStateType) => {
    return {
        isAuth:  state.auth.isAuth
    }
}

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    function RedirectComponent(props: MapStatePropsType) {
        let {isAuth, ...restProps} = props
        if(!isAuth) return <Redirect to='/login'/>
        return <WrappedComponent {...restProps as WCP} />
    }

    return connect(mapStateToProps)(RedirectComponent);
}