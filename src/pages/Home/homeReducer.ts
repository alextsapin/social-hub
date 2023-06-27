/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable default-param-last */
import { Dispatch } from 'redux';

import { AppThunkType } from '../../App/store';
import { followAPI, unFollowAPI, usersAPI } from '../../shared/api/api';
import { codeSuccess } from '../../shared/constants';

export type UserType = {
    id: number;
    name: string;
    status: string;
    photos: {
        small: string | null;
        large: string | null;
    };
    followed: boolean;
};

type StateType = {
    isFetching: boolean;
    followUsers: Array<number>;
    users: UserType[];
    usersCount: number;
    pageSize: number;
    currentPage: number;
    pageArray: Array<number>;
};

const initialState: StateType = {
    isFetching: false,
    followUsers: [],
    users: [],
    usersCount: 0,
    pageSize: 16,
    currentPage: 1,
    pageArray: [],
};

const usersReducer = (state = initialState, action: UnionTypes): StateType => {
    switch (action.type) {
        case 'FOLLOW': {
            return {
                ...state,
                users: state.users.map((u: UserType) =>
                    u.id === action.id ? { ...u, followed: true } : u,
                ),
            };
        }

        case 'UNFOLLOW': {
            return {
                ...state,
                users: state.users.map((u: UserType) =>
                    u.id === action.id ? { ...u, followed: false } : u,
                ),
            };
        }

        case 'SET_USERS': {
            return {
                ...state,
                users: action.users,
            };
        }

        case 'SET_USERS_COUNT': {
            return {
                ...state,
                usersCount: action.count,
            };
        }

        case 'SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.currentPage,
            };
        }

        case 'SET_PAGE_ARRAY': {
            return {
                ...state,
                pageArray: action.pageArray,
            };
        }

        case 'TOGGLE_IS_FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching,
            };
        }

        case 'TOGGLE_USER_FOLLOW': {
            return {
                ...state,
                followUsers: action.isFetching
                    ? [...state.followUsers, action.id]
                    : state.followUsers.filter(id => id !== action.id),
            };
        }

        default: {
            return state;
        }
    }
};

type toggleIsFetchingType = {
    type: 'TOGGLE_IS_FETCHING';
    isFetching: boolean;
};

const toggleIsFetchingAC = (isFetching: boolean): toggleIsFetchingType => ({
    type: 'TOGGLE_IS_FETCHING' as const,
    isFetching,
});

type toggleUserFollowType = {
    type: 'TOGGLE_USER_FOLLOW';
    id: number;
    isFetching: boolean;
};

const toggleUserFollowAC = (id: number, isFetching: boolean): toggleUserFollowType => ({
    type: 'TOGGLE_USER_FOLLOW' as const,
    id,
    isFetching,
});

type FollowType = {
    type: 'FOLLOW';
    id: number;
};

const followAC = (id: number): FollowType => ({
    type: 'FOLLOW' as const,
    id,
});

type UnFollowType = {
    type: 'UNFOLLOW';
    id: number;
};

const unFollowAC = (id: number): UnFollowType => ({
    type: 'UNFOLLOW' as const,
    id,
});

type SetUsersType = {
    type: 'SET_USERS';
    users: UserType[];
};

const setUsersAC = (users: UserType[]): SetUsersType => ({
    type: 'SET_USERS' as const,
    users,
});

type SetUsersCountType = {
    type: 'SET_USERS_COUNT';
    count: number;
};

const setUsersCountAC = (count: number): SetUsersCountType => ({
    type: 'SET_USERS_COUNT',
    count,
});

type SetCurrentPageType = {
    type: 'SET_CURRENT_PAGE';
    currentPage: number;
};

export const setCurrentPageAC = (currentPage: number): SetCurrentPageType => ({
    type: 'SET_CURRENT_PAGE',
    currentPage,
});

type SetPagesType = {
    type: 'SET_PAGE_ARRAY';
    pageArray: number[];
};

const setPageBoxAC = (pageArray: Array<number>): SetPagesType => ({
    type: 'SET_PAGE_ARRAY' as const,
    pageArray,
});

type UnionTypes =
    | toggleIsFetchingType
    | toggleUserFollowType
    | FollowType
    | UnFollowType
    | SetUsersType
    | SetUsersCountType
    | SetCurrentPageType
    | SetPagesType;

export const calcTotalPagesTC = (usersCount: number, pageSize: number): AppThunkType => {
    return (dispatch: Dispatch) => {
        const total = Math.ceil(usersCount / pageSize);
        const pageArray = [];

        for (let i = 1; i <= total; i++) {
            pageArray.push(i);
        }

        dispatch(setPageBoxAC(pageArray));
    };
};

// eslint-disable-next-line prettier/prettier
export const getUsersTC = (currentPage: number, usersCount: number, pageSize: number): AppThunkType => {
    return async dispatch => {
        dispatch(setUsersAC([]));
        setCurrentPageAC(currentPage);
        try {
            const res = await usersAPI.getUsers(currentPage, pageSize);

            if (res.status === codeSuccess) {
                dispatch(setUsersAC(res.data.items));
                dispatch(calcTotalPagesTC(usersCount, pageSize) as any);
                dispatch(setUsersCountAC(res.data.totalCount));
            } else {
                console.warn('Network error...');
            }
        } catch {
            console.warn('Get users error...');
        }
    };
};

export const followTC = (id: number): AppThunkType => {
    return async dispatch => {
        dispatch(toggleIsFetchingAC(true));
        dispatch(toggleUserFollowAC(id, true));
        followAPI(id).then(() => {
            dispatch(followAC(id));
            dispatch(toggleIsFetchingAC(false));
            dispatch(toggleUserFollowAC(id, false));
        });
    };
};

export const unFollowTC = (id: number): AppThunkType => {
    return async dispatch => {
        dispatch(toggleIsFetchingAC(true));
        dispatch(toggleUserFollowAC(id, true));
        unFollowAPI(id).then(() => {
            dispatch(unFollowAC(id));
            dispatch(toggleIsFetchingAC(false));
            dispatch(toggleUserFollowAC(id, false));
        });
    };
};

export default usersReducer;
