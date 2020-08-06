import {authTC} from './auth';

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