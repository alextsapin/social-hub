import {authTC} from './auth';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from '../store';

type StateType = typeof initialState;

// Первичный state
let initialState = {
    initialize: false
}

const appReducer = (state = initialState, action: InitializeACType): StateType => {
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
type InitializeACType = ReturnType<typeof initializeAC>
export const initializeAC = () => ({
    type: 'SET_INITIALIZE'
})

// Thunk creators
export const initializeTC = (): ThunkAction<Promise<void>, AppStateType, unknown, InitializeACType> => {
    return async (dispatch) => {
        let promise = dispatch(authTC());
        Promise.all([promise]).then(() => {
            dispatch(initializeAC());
        })
    }
}