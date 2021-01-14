import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const withAuthRedirect = (Component) => {

    let RedirectComponent = (props) => {
        if(!props.isAuth) return <Redirect to='/login'/>
        return <Component {...props} />
    }

    let AuthRedirectConnect = connect(mapStateToProps)(RedirectComponent);

    return AuthRedirectConnect;
}

/* 

    type MapStatePropsType = {
        isAuth: boolean
    }

    let mapStateToProps = (state: appStateType) => {
        return {
            isAuth:  state.auth.isAuth
        }
    }

    export function withAuthRedirect<WCP> (WrappedComponent: React.ComponentType<WCP>) {

        function RedirectComponent(props: MapStatePropsType) {
            let {isAuth, ...restProps} = props
            if(!isAuth) return <Redirect to='/login'/>
            return <WrappedComponent {...restProps as WCP} />
        }
        
        return connect(mapStateToProps)(RedirectComponent);
    }

*/