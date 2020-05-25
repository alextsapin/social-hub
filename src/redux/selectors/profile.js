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