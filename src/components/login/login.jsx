import React from 'react';
import {Field, reduxForm} from 'redux-form';

const LoginForm = (props) => {  

    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form-group">
                <label>Login</label>
                <Field className="form-control" name="login" component="input" type="text"/>
            </div>
            <div class="form-group">
                <label>Password</label>
                <Field className="form-control" name="password" component="input" type="password"/>
                <small className="form-text text-muted">Do not share your password with anyone!</small>
            </div>
            <div class="form-group form-check">
                <Field className="form-check-input" name="rememberMe" component="input" type="checkbox" id="rememberMe"/>
                <label className="form-check-label" for="rememberMe">remember me</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
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