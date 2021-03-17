import {AppStateType} from '../store';

export const userIdSL = (state: AppStateType): null | number => {
    return state.auth['id']
}

export const isAuthSL = (state: AppStateType) => {
    return state.auth['isAuth']
}

export const userLoginSelector = (state: AppStateType) => {
    return state.auth['login']
}

export const getCaptchaUrlSelector = (state: AppStateType) => {
    return state.auth['captchaUrl']
}