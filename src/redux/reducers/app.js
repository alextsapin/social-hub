import {authTC} from './auth.js';

// Первичный state
let initialState = {
    initialize: false
}

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_INITIALIZE':
        return {
            ...state,
            initialize: true
        }
    }
    return state;
}

export default appReducer;

// Action creators
export const initializeAC = () => ({
    type: 'SET_INITIALIZE'
})

// Thunk creators
export const initializeTC = () => {
    return (dispatch) => {
        let promise = dispatch(authTC());
        Promise.all([promise]).then(() => {
            dispatch(initializeAC());
        })
    }
}




/* export const initializeTC = () => {
    return (dispatch) => {
        authAPI().then(response => {
            if(response.resultCode === 0) {
                let {id, email, login} = response.data;
                dispatch(initializeAC(id, email, login, true));
            }
        });
    }
} */