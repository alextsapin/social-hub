import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';

// Thunk creators
import {loginTC, getCaptchaUrlTC} from '../../redux/reducers/auth';

// HOC
import {withProfileRedirect} from '../../hoc/withProfileRedirect';

// Global State Type
import {AppStateType} from '../../redux/store';

// Form
import LoginForm from './form';

// Selector
import {getCaptchaUrlSelector} from '../../redux/selectors/auth';

type mapStatePropsType = {
    captchaUrl: string;
    isAuth?: boolean;
}

type mapDispatchPropsType = {
    getCaptchaUrlTC: () => void;
    loginTC: (email: string, password: string, rememberMe: boolean, captcha: string) => void;
}

type propsType = mapStatePropsType & mapDispatchPropsType;

class Login extends React.Component<propsType> {

    componentDidMount() {   
        this.props.getCaptchaUrlTC();
    }
    
    onSubmit = (data: any) => {
        this.props.loginTC(data.email, data.password, data.rememberMe, data.captcha);
    }

    render() {
        return (
            <div className="row mt-5 mb-5">
                <div className="col-12">
                    <h1 className="title title_first">Login</h1>
                </div>
                
                <div className="offset-md-3 col-md-6">
                    <LoginForm captchaUrl={this.props.captchaUrl} onSubmit={this.onSubmit}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    captchaUrl: getCaptchaUrlSelector(state)
})

export default compose(withProfileRedirect, connect(mapStateToProps, {loginTC, getCaptchaUrlTC}))(Login);