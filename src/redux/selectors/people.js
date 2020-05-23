import {createSelector} from 'reselect';

const getPeople = (state) => {
    return state.people.data
};

export const peopleSelector = createSelector(getPeople, (data) => {
    return data;
});

export const pageSizeSelector = (state) => {
    return state.people.size
}

export const peopleCountSelector = (state) => {
    return state.people.count
}

export const currentPageSelector = (state) => {
    return state.people.currentPage
}

export const isConnectSelector = (state) => {
    return state.people.isConnect
}

export const followUsersSelector = (state) => {
    return state.people.followUsers
}