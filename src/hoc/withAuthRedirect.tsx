import React from 'react';
import {Redirect} from 'react-router-dom';

type PropsType = {
    isAuth: boolean
}

export function withAuthRedirect<WP>(WrappedComponent: React.ComponentType<WP>) {
    return (props: WP & PropsType) => {
        if(!props.isAuth) return <Redirect to='/login'/>
        return <WrappedComponent {...props} />
    }
}