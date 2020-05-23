import {createSelector} from 'reselect';

const getStatus = (state) => {
    return state.people.data
};

export const statusSelector = createSelector(getPeople, (data) => {
    return data;
});

export const pageSizeSelector = (state) => {
    return state.people.size
}