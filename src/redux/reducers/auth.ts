import {stopSubmit} from 'redux-form';
import {authAPI, loginAPI, logoutAPI, getCaptchaUrlAPI} from '../../api/api';
import {Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from '../store';

// Выведем тип из первичного стрейта
type StateType = typeof initialState;

// Первичный state
let initialState = {
    id: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
    captchaUrl: null as null | string
}

const authReducer = (state = initialState, action: JoinACType): StateType => {
    switch(action.type) {
        case 'SET_USER_DATA':
        return {...state,...action.data}
    
        case 'GET_CAPTCHA_URL':
        return {...state, captchaUrl: action.captchaUrl}

        default:
        return state
    }
}

export default authReducer;

// Action creators
type SetAuthDataACType = ReturnType<typeof setAuthDataAC>

const setAuthDataAC = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'SET_USER_DATA',
    data: {id, email, login, isAuth}
})

// Выведем тип из Action
type GetCaptchaUrlACType = ReturnType<typeof getCaptchaUrlAC>

const getCaptchaUrlAC = (captchaUrl: string) => ({
    type: 'GET_CAPTCHA_URL',
    captchaUrl
})

// Общий тип
type JoinACType = SetAuthDataACType & GetCaptchaUrlACType;

// Thunk creators
export const authTC = (): ThunkAction<Promise<any>, AppStateType, unknown, JoinACType> => {
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

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkAction<Promise<any>, AppStateType, unknown, JoinACType> => {
    return async (dispatch: any) => {
        let response = await loginAPI(email, password, rememberMe, captcha);
        if(response.resultCode === 0) {
            dispatch(authTC());
        } else {
            if (response.resultCode === 10) {
                dispatch(getCaptchaUrlTC());
            } else {
                let error = response.messages[0].length > 0 ? response.messages[0] : 'Some error';
                dispatch(stopSubmit('Login', {_error: error}));
            }
        }
    }
}

export const logoutTC = (): ThunkAction<Promise<any>, AppStateType, unknown, JoinACType> => {
    return async (dispatch: Dispatch) => {
        let response = await logoutAPI();
        if(response.resultCode === 0) {
            dispatch(setAuthDataAC(null, null, null, false));
        }
    }
}

export const getCaptchaUrlTC = (): ThunkAction<Promise<any>, AppStateType, unknown, JoinACType> => {
    return async (dispatch: Dispatch) => {
        let response = await getCaptchaUrlAPI();
        let captchaUrl = response.data.url;
        dispatch(getCaptchaUrlAC(captchaUrl));
    }
}