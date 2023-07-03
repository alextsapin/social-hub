/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSelector } from 'reselect';

import { AppStateType } from '../../App/store';

export const getUsersCountSL = (state: AppStateType): number => {
    return state.home.usersCount;
};

export const getPageSizeSL = (state: AppStateType): number => {
    return state.home.pageSize;
};

export const getСurrentPageSL = (state: AppStateType): number => {
    return state.home.currentPage;
};

export const getPageArraySL = (state: AppStateType): number[] => {
    return state.home.pageArray;
};

export const getPageCountSL = (state: AppStateType): number => {
    return Math.ceil(state.home.usersCount / state.home.pageSize);
};

export const pagesArraySL = createSelector(getPageCountSL, count => {
    const pages = [];

    for (let i = 1; i <= count; i++) {
        pages.push(i);
    }

    return pages;
});
