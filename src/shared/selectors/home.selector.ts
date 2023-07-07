/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSelector } from 'reselect';

import { AppStateType } from '../../App/store';

const getUsersCountSL = (state: AppStateType): number => {
    return state.home.usersCount;
};

const getPageSizeSL = (state: AppStateType): number => {
    return state.home.pageSize;
};

export const getСurrentPageSL = (state: AppStateType): number => {
    return state.home.currentPage;
};

const calcPageCount = (state: AppStateType): number => {
    return Math.ceil(state.home.usersCount / state.home.pageSize);
};

export const createPageArraySL = createSelector(calcPageCount, count => {
    const pages = [];

    for (let i = 1; i <= count; i++) {
        pages.push(i);
    }

    return pages;
});

const getSectionSize = (state: AppStateType): number => {
    return state.home.sectionSize;
};

// eslint-disable-next-line prettier/prettier
export const calcTotalSectionSL = createSelector(getUsersCountSL, getPageSizeSL, getSectionSize, (count, users, size) => {
        return Math.ceil(count / users / size);
    },
);
