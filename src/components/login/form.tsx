import React from 'react';
import {Field, reduxForm, InjectedFormProps} from 'redux-form';
import ImageLoader from 'react-imageloader';
import Button from '@material-ui/core/Button';
import lineloader from '../spinners/captchaSpinner';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// Form
import {requiredField, maxLengthCreator, minLengthCreator} from '../../utilities/validators';
import {InputText} from '../../fields/input/text';
import {InputPass} from '../../fields/input/password';
import {InputCheck} from '../../fields/input/checkbox';

const maxLength20 = maxLengthCreator(20);
const minLength3 = minLengthCreator(3);
const minLength6 = minLengthCreator(6);

type loginFormOwnProps = {
    captchaUrl: string;
}

type loginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

const LoginForm: React.FC<InjectedFormProps<loginFormValuesType, loginFormOwnProps> & loginFormOwnProps> = (props) => {  
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

            <div className="form-group">
                <Field className="form-check-input font-weight-bold mb-1" name="rememberMe" component={InputCheck}/>
                <label className="form-check-label font-weight-bold" htmlFor="rememberMe">Запомнить меня</label>
            </div>

            <ImageLoader className="captchaImage" src={props.captchaUrl} wrapper={React.createFactory('div')} 
                preloader={lineloader}>
            </ImageLoader>

            <div className="form-group">
                <label className="font-weight-bold mt-2 mb-1">Captcha</label>
                <Field name="captcha" component={InputText}/>
            </div>

            <Button  variant="contained" color="primary" type="submit">Вход</Button>
        </form>
    );
}

export default reduxForm<loginFormValuesType, loginFormOwnProps>({form: 'Login'})(LoginForm);