import { AppStateType } from '../../App/store';
// import { UserType } from '../../pages/Profile/profileReducer';

export const getAllUsersSL = (state: AppStateType): any => {
    return state.users.users;
};

export const getUsersCountSL = (state: AppStateType): number => {
    return state.users.usersCount;
};

export const getPageSizeSL = (state: AppStateType): number => {
    return state.users.pageSize;
};

export const getСurrentPageSL = (state: AppStateType): number => {
    return state.users.currentPage;
};

export const getPageArraySL = (state: AppStateType): number[] => {
    return state.users.pageArray;
};

export const getFollowUsersSL = (state: AppStateType): number[] => {
    return state.users.followUsers;
};
