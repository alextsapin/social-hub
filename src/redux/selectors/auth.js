export const userIdSelector = (state) => {
    return state.auth.id;
}

export const isAuthSelector = (state) => {
    return state.auth.isAuth;
}

export const userLoginSelector = (state) => {
    return state.auth.login;
}

export const getCaptchaUrlSelector = (state) => {
    return state.auth.captchaUrl;
}