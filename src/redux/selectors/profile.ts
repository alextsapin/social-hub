import {createSelector} from 'reselect';
import {appStateType} from '../store';

const getStatus = (state: appStateType) => {
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

export const postSelector = (state: appStateType) => {
    return state.profile.post;
};

export const dataSelector = (state: appStateType) => {
    return state.profile.data;
};

export const personSelector = (state: appStateType) => {
    return state.profile.person;
};