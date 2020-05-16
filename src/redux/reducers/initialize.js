// DAL
import {authAPI} from '../../api/api.js';

// Первичный state
let initialState = {
    initialize: false
}

const initializeReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_INITIALIZE':
        return {
            ...state,
            initialize: true
        }
    }
    return state;
}

export default initializeReducer;

// Action creators
export const initializeAC = () => ({
    type: 'SET_INITIALIZE'
})

// Thunk creators
export const initializeTC = () => {
    return (dispatch) => {
        authAPI().then(response => {
            if(response.resultCode === 0) {
                let {id, email, login} = response.data;
                dispatch(initializeAC(id, email, login, true));
            }
        });
    }
}