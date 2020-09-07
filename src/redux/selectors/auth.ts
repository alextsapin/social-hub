import {AppStateType} from '../store';

export const userIdSelector = (state: AppStateType): number => {
    return state.auth['id']
}

export const isAuthSelector = (state: AppStateType) => {
    return state.auth['isAuth']
}

export const userLoginSelector = (state: AppStateType) => {
    return state.auth['login']
}

export const getCaptchaUrlSelector = (state: AppStateType) => {
    return state.auth['captchaUrl']
}