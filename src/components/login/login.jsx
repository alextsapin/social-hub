import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import ImageLoader from 'react-imageloader';
import lineloader from '../spinners/captchaSpinner';

// Form
import {requiredField, maxLengthCreator, minLengthCreator} from '../../utilities/validators';
import {InputText, InputPass, InputCheck} from '../../fields/fields';

// Thunk creators
import {loginTC, getCaptchaUrlTC} from '../../redux/reducers/auth';

// HOC
import {withProfileRedirect} from '../../hoc/withProfileRedirect';

const maxLength20 = maxLengthCreator(20);
const minLength3 = minLengthCreator(3);
const minLength6 = minLengthCreator(6);

const LoginForm = (props) => {  

    return (
        <form onSubmit={props.handleSubmit}>
            {props.error && <p className="alert alert-danger text-center" role="alert">{props.error}</p>}
            <div className="form-group">
                <label className="font-weight-bold mb-1">Email</label>
                <Field name="email" component={InputText} validate={[requiredField, maxLength20, minLength3]}/>
                <small className="form-text text-muted">alextsapin@yandex.ru</small>
            </div>

            <div className="form-group">
                <label className="font-weight-bold mb-1">Password</label>
                <Field name="password" component={InputPass} validate={[requiredField, maxLength20, minLength6]}/>
                <small className="form-text text-muted">wXq1EbIL</small>
            </div>

            <div className="form-group form-check">
                <Field className="form-check-input font-weight-bold mb-1" name="rememberMe" component={InputCheck}/>
                <label className="form-check-label font-weight-bold" htmlFor="rememberMe">Запомнить меня</label>
            </div>

            <ImageLoader className="captchaImage" src={props.captchaUrl} wrapper={React.createFactory('div')} preloader={lineloader}></ImageLoader>

            <div className="form-group">
                <label className="font-weight-bold mt-2 mb-1">Captcha</label>
                <Field name="captcha" component={InputText} validate={[requiredField]}/>
            </div>

            <button type="submit" className="btn btn-secondary">Login</button>
        </form>
    );
}

const LoginFormRedux = reduxForm({form: 'Login'})(LoginForm);

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
                    <LoginFormRedux captchaUrl={this.props.captchaUrl} onSubmit={this.onSubmit}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl
})

export default compose(
    withProfileRedirect, 
    connect(mapStateToProps, {loginTC, getCaptchaUrlTC}))(Login);