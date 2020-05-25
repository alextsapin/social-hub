import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {requiredField, maxLengthCreator, minLengthCreator} from '../../utilities/validators.js';
import {InputText, InputPass, InputCheck} from '../fields/fields.js';
import {loginTC} from '../../redux/reducers/auth.js';

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
            </div>
            <div className="form-group">
                <label>Password</label>
                <Field name="password" component={InputPass} validate={[requiredField, maxLength20, minLength6]}/>
                <small className="form-text text-muted">Do not share your password with anyone! wXq1EbIL</small>
            </div>
            <div className="form-group form-check">
                <Field className="form-check-input" name="rememberMe" component={InputCheck} />
                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
            </div>
            <button type="submit" className="btn btn-secondary">LOGIN</button>
        </form>
    );
}

const LoginFormRedux = reduxForm({form: 'Login'})(LoginForm);

const Login = (props) => {    

    const onSubmit = (data) => {
        props.loginTC(data.email, data.password, data.rememberMe)
    }
    
    return (
        <div className="row mt-5 mb-5">
            <div className="col-12">
                <h1 className="title">Login</h1>
            </div>
            
            <div className="col-md-6">
                <LoginFormRedux onSubmit={onSubmit}/>
            </div>
      </div>
    );
}

export default connect(null, {loginTC})(Login);