// DAL
import {stopSubmit} from 'redux-form';

import {getProfileTC} from './profile.js';
import {authAPI, loginAPI, logoutAPI} from '../../api/api.js';

// Первичный state
let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_USER_DATA':
        return {
            ...state,
            ...action.data
        }
    }
    return state;
}

export default authReducer;

// Action creators
export const setAuthDataAC = (id, email, login, isAuth) => ({
    type: 'SET_USER_DATA',
    data: {id, email, login, isAuth}
})

// Thunk creators
export const authTC = () => {
    return (dispatch) => {
        return authAPI().then(response => {
            if(response.resultCode === 0) {
                let {id, email, login} = response.data;
                dispatch(setAuthDataAC(id, email, login, true));
                //dispatch(getProfileTC(id))
            } else {
                dispatch(setAuthDataAC(null, null, null, false));
            }
        });
    }
}

export const loginTC = (email, password, rememberMe) => {
    return (dispatch) => {
        loginAPI(email, password, rememberMe).then(response => {
            if(response.resultCode === 0) {
                dispatch(authTC());
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