// DAL
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
        authAPI().then(response => {
            if(response.resultCode === 0) {
                let {id, email, login} = response.data;
                dispatch(setAuthDataAC(id, email, login, true));
            }
        });
    }
}

export const loginTC = (email, password, rememberMe) => {
    return (dispatch) => {
        loginAPI(email, password, rememberMe).then(response => {
            if(response.resultCode === 0) {
                authAPI().then(response => {
                    if(response.resultCode === 0) {
                        let {id, email, login} = response.data;
                        dispatch(setAuthDataAC(id, email, login, true));
                    }
                });
            }
        });
    }
}

export const logoutTC = () => {
    return (dispatch) => {
        logoutAPI().then(response => {
            if(response.resultCode === 0) {
                let {id, email, login} = response.data;
                dispatch(setAuthDataAC(null, null, null, false));
            }
        });
    }
}