import {appStateType} from '../store';

export const userIdSelector = (state: appStateType) => {
    return state.auth.id;
}

export const isAuthSelector = (state: appStateType) => {
    return state.auth.isAuth;
}

export const userLoginSelector = (state: appStateType) => {
    return state.auth.login;
}

export const getCaptchaUrlSelector = (state: appStateType) => {
    return state.auth.captchaUrl;
}