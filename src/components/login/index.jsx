import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';

// Thunk creators
import {loginTC, getCaptchaUrlTC} from '../../redux/reducers/auth';

// HOC
import {withProfileRedirect} from '../../hoc/withProfileRedirect';

// Global State Type
import {appStateType} from '../../redux/store';

// Form
import LoginForm from './form';

class Login extends React.Component {

    componentDidMount() {   
        this.props.getCaptchaUrlTC();
    }
    
    onSubmit = (data) => {
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

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl
})

export default compose(withProfileRedirect, 
    connect(mapStateToProps, {loginTC, getCaptchaUrlTC}))(Login);