import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';

// Thunk creators
import {loginTC} from '../../redux/reducers/auth';

// HOC
import {withProfileRedirect} from '../../hoc/withProfileRedirect';

// Global State Type
import {AppStateType} from '../../redux/store';

// Form
import LoginForm from './form/form';

// Selector
import {getCaptchaUrlSelector} from '../../redux/selectors/auth';

type mapStatePropsType = {
    captchaUrl: null | string;
    isAuth?: boolean;
}

type mapDispatchPropsType = {
    loginTC: (email: string, password: string, rememberMe: boolean, captcha: string) => void;
}

type propsType = mapStatePropsType & mapDispatchPropsType;

const Login = (props: propsType) => {
    
    const onSubmit = (data: any) => {
        props.loginTC(data.email, data.password, data.rememberMe, data.captcha);
    }

    return (
        <div className="row mt-5 mb-5">
            <div className="col-12">
                <h1 className="title title_first">Login</h1>
            </div>
            
            <div className="offset-md-3 col-md-6">
                <LoginForm captchaUrl={props.captchaUrl} onSubmit={onSubmit}/>
            </div>
        </div>
    );
    
}

const mapStateToProps = (state: AppStateType) => ({
    captchaUrl: getCaptchaUrlSelector(state)
})

export default compose<React.ComponentType>(
    withProfileRedirect, 
    connect(mapStateToProps, {loginTC}))(Login);