import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {requiredField, maxLengthCreator, minLength} from '../../utilities/validators.js';
import {InputText, InputPass, InputCheck} from '../controls/fields.js';

const maxLength20 = maxLengthCreator(20);
const LoginForm = (props) => {  
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form-group">
                <label>Login</label>
                <Field name="login" component={InputText} validate={[requiredField, maxLength20, minLength]}/>
            </div>
            <div class="form-group">
                <label>Password</label>
                <Field name="password" component={InputPass} validate={[requiredField, maxLength20, minLength]}/>
                <small className="form-text text-muted">Do not share your password with anyone!</small>
            </div>
            <div class="form-group form-check">
                <Field className="form-check-input" name="rememberMe" component={InputCheck} />
                <label className="form-check-label" for="rememberMe">Remember me</label>
            </div>
            <button type="submit" className="btn btn-secondary">LOGIN</button>
        </form>
    );
}

const LoginFormRedux = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => {    
    const onSubmit = (data) => {
        console.log(data);
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

export default Login;