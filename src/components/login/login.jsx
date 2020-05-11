import React from 'react';

const Login = (props) => {    
    return (
        <div className="row mt-5 mb-5">
            <div className="col-md-6">
                <form>
                    <div className="form-group">
                        <label>Login</label>
                        <input type="text" className="form-control"/>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control"/>
                        <small className="form-text text-muted">Не сообщайте свой пароль никому!</small>
                    </div>
                    <div class="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
      </div>
    );
}

export default Login;