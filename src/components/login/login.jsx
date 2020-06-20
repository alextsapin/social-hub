import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

// Form
import {requiredField, maxLengthCreator, minLengthCreator} from '../../utilities/validators.js';
import {InputText, InputPass, InputCheck} from '../../fields/fields.js';

// Thunk creators
import {loginTC} from '../../redux/reducers/auth.js';

// HOC
import {withProfileRedirect} from '../../hoc/withProfileRedirect.js';

const maxLength20 = maxLengthCreator(20);
const minLength3 = minLengthCreator(3);
const minLength6 = minLengthCreator(6);

const LoginForm = (props) => {  

    return (
        <form onSubmit={props.handleSubmit}>
            {props.error && <p className="alert alert-danger text-center" role="alert">{props.error}</p>}
            <div className="form-group">
                <label>Email</label>
                <Field name="email" component={InputText} validate={[requiredField, maxLength20, minLength3]}/>
                <small className="form-text text-muted">alextsapin@yandex.ru</small>
            </div>

            <div className="form-group">
                <label>Password</label>
                <Field name="password" component={InputPass} validate={[requiredField, maxLength20, minLength6]}/>
                <small className="form-text text-muted">wXq1EbIL</small>
            </div>

            <img className="img-thumbnail" src={props.captchaUrl}/>

            <div className="form-group">
                <label>Captcha</label>
                <Field name="captcha" component={InputText} validate={[requiredField]}/>
            </div>

            <div className="form-group form-check">
                <Field className="form-check-input" name="rememberMe" component={InputCheck} />
                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
            </div>

            <button type="submit" className="btn btn-secondary">Login</button>
        </form>
    );
}

const LoginFormRedux = reduxForm({form: 'Login'})(LoginForm);

const Login = (props) => {    

    const onSubmit = (data) => {
        props.loginTC(data.email, data.password, data.rememberMe, data.captcha)
    }
    
    return (
        <div className="row mt-5 mb-5">
            <div className="col-12">
                <h1 className="title">Login</h1>
            </div>
            
            <div className="offset-md-3 col-md-6">
                <LoginFormRedux captchaUrl={props.captchaUrl} onSubmit={onSubmit}/>
            </div>
      </div>
    );
}

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl
})

export default compose(
    //withProfileRedirect, 
    connect(mapStateToProps, {loginTC}))(Login);