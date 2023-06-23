import {createSelector} from 'reselect';
import {AppStateType} from '../store';

const getStatus = (state: AppStateType) => {
    return state.profile.status;
};

export const statusSelector = createSelector(getStatus, (status) => {
    if(status === null) {
        return '....................';
    }
    else {
        return status;
    }
});

export const postSelector = (state: AppStateType) => {
    return state.profile.post;
};

export const dataSelector = (state: AppStateType) => {
    return state.profile.data;
};

export const personSelector = (state: AppStateType) => {
    return state.profile.person;
};