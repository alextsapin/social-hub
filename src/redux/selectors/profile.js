import {createSelector} from 'reselect';

const getStatus = (state) => {
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

export const postSelector = (state) => {
    return state.profile.post;
};

export const dataSelector = (state) => {
    return state.profile.data;
};

export const personSelector = (state) => {
    return state.profile.person;
};


