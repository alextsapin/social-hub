import {stopSubmit} from 'redux-form';
import {authAPI, loginAPI, logoutAPI, getCaptchaUrlAPI} from '../../api/api';
import {Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from '../store';

type initialStateType = {
    id: number;
    email: string; 
    login: string;
    isAuth: boolean;
    captchaUrl: string;
}

// Первичный state
let initialState = {
    id: 0,
    email: '',
    login: '',
    isAuth: false,
    captchaUrl: 'https://i.ibb.co/6tMC3gs/captcha.gif'
}

const authReducer = (state = initialState, action: ACType): initialStateType => {
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

type setAuthUserDataACType = {
    id: number;
    email: string;
    login: string;
    isAuth: boolean;
}

type setAuthDataACType = {
    type: string;
    data: setAuthUserDataACType;
}

// Action creators
const setAuthDataAC = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'SET_USER_DATA',
    data: {id, email, login, isAuth}
})

type getCaptchaUrlACType = {
    type: string;
    captchaUrl: string;
}

const getCaptchaUrlAC = (captchaUrl: string) => ({
    type: 'GET_CAPTCHA_URL',
    captchaUrl
})

type ACType = setAuthDataACType & getCaptchaUrlACType;

// Thunk creators
export const authTC = (): ThunkAction<Promise<any>, AppStateType, unknown, ACType> => {
    return async (dispatch: Dispatch) => {
        let response = await authAPI();
        if(response.resultCode === 0) {
            let {id, email, login} = response.data;
            dispatch(setAuthDataAC(id, email, login, true));
        } else {
            dispatch(setAuthDataAC(null, null, null, false));
        }
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkAction<Promise<any>, AppStateType, unknown, ACType> => {
    return async (dispatch: any) => {
        let response = await loginAPI(email, password, rememberMe, captcha);
        if(response.resultCode === 0) {
            dispatch(authTC());
        } else if (response.resultCode === 10) {
            console.log(response);
            dispatch(stopSubmit('Login', {_error: response.messages[0]}));
        } else {
            let error = response.messages[0].length > 0 ? response.messages[0] : 'Some error';
            dispatch(stopSubmit('Login', {_error: error}));
        }
    }
}

export const logoutTC = (): ThunkAction<Promise<any>, AppStateType, unknown, ACType> => {
    return async (dispatch: Dispatch) => {
        let response = await logoutAPI();
        if(response.resultCode === 0) {
            dispatch(setAuthDataAC(null, null, null, false));
        }
    }
}

export const getCaptchaUrlTC = (): ThunkAction<Promise<any>, AppStateType, unknown, ACType> => {
    return async (dispatch: Dispatch) => {
        let response = await getCaptchaUrlAPI();
        let captchaUrl = response.data.url;
        dispatch(getCaptchaUrlAC(captchaUrl));
    }
}