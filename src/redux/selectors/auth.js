import {createSelector} from 'reselect';

export const userIdSelector = (state) => {
    return state.auth.id;
}

export const isAuthSelector = (state) => {
    return state.auth.isAuth;
}