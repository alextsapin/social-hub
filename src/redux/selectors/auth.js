import {createSelector} from 'reselect';


export const userIdSelector = (state) => {
    return state.auth.id;
}