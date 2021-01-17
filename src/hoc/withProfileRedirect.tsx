import React from 'react';
import {Redirect} from 'react-router-dom';

type PropsType = {
    isAuth: boolean
}

export function withProfileRedirect<WP>(WrappedComponent: React.ComponentType<WP>) {
    return (props: WP & PropsType) => {
        if(!props.isAuth) return <Redirect to='/profile'/>
        return <WrappedComponent {...props} />
    }
}
