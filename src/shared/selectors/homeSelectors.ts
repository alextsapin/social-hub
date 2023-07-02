/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSelector } from 'reselect';

import { AppStateType } from '../../App/store';
import { UserType } from '../../pages/Home/homeReducer';

export const getAllUsersSL = (state: AppStateType): UserType[] => {
    return state.home.users;
};

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

export const getFollowUsersSL = (state: AppStateType): number[] => {
    return state.home.followUsers;
};
