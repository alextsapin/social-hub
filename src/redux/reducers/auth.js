import {stopSubmit} from 'redux-form';
import {authAPI, loginAPI, logoutAPI, getCaptchaUrlAPI} from '../../api/api.js';

// Первичный state
let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.data
            }
    
        case 'GET_CAPTCHA_URL':

        return {...state, captchaUrl: action.captchaUrl}

        default:
        return state
    }
}

export default authReducer;

// Action creators
const setAuthDataAC = (id, email, login, isAuth) => ({
    type: 'SET_USER_DATA',
    data: {id, email, login, isAuth}
})

const getCaptchaUrlAC = (captchaUrl) => ({
    type: 'GET_CAPTCHA_URL',
    captchaUrl
})

// Thunk creators
export const authTC = () => {
    return (dispatch) => {
        return authAPI().then(response => {
            if(response.resultCode === 0) {
                let {id, email, login} = response.data;
                dispatch(setAuthDataAC(id, email, login, true));
            } else {
                dispatch(setAuthDataAC(null, null, null, false));
            }
        });
    }
}

export const loginTC = (email, password, rememberMe, captcha) => {
    return (dispatch) => {
        loginAPI(email, password, rememberMe, captcha).then(response => {
            if(response.resultCode === 0) {
                dispatch(authTC());
            } else if (response.resultCode === 10) {
                console.log(1111111111);
                console.log(response);
                dispatch(stopSubmit('Login', {_error: response.messages[0]}));
            } else {
                let error = response.messages[0].length > 0 ? response.messages[0] : 'Some error';
                dispatch(stopSubmit('Login', {_error: error}));
            }
        });
    }
}

export const logoutTC = () => {
    return (dispatch) => {
        logoutAPI().then(response => {
            if(response.resultCode === 0) {
                dispatch(setAuthDataAC(null, null, null, false));
            }
        });
    }
}

export const getCaptchaUrlTC = () => {
    return async (dispatch) => {
        let response = await getCaptchaUrlAPI();
        let captchaUrl = response.data.url;
        dispatch(getCaptchaUrlAC(captchaUrl));
    }
}