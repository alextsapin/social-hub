import {authTC} from './auth';

import {Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {appStateType} from '../store';

type initialStateType = {
    initialize: boolean;
}

// Первичный state
let initialState = {
    initialize: false
}

const appReducer = (state = initialState, action: initializeACType): initialStateType => {
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

type initializeACType = {
    type: string;
}

// Action creators
export const initializeAC = () => ({
    type: 'SET_INITIALIZE'
})

// Thunk creators
export const initializeTC = (): ThunkAction<Promise<void>, appStateType, unknown, initializeACType> => {
    return async (dispatch) => {
        let promise = dispatch(authTC());
        Promise.all([promise]).then(() => {
            dispatch(initializeAC());
        })
    }
}