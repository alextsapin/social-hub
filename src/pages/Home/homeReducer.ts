/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable default-param-last */
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
    followUsers: Array<number>;
    users: UserType[];
    usersCount: number;
    pageSize: number;
    currentPage: number;
    pageArray: Array<number>;
};

const initialState: StateType = {
    followUsers: [],
    users: [],
    usersCount: 0,
    pageSize: 16,
    currentPage: 1,
    pageArray: [],
};

export const homeReducer = (state = initialState, action: UnionTypes): StateType => {
    switch (action.type) {
        case 'HOME/FOLLOW': {
            return {
                ...state,
                users: state.users.map((u: UserType) =>
                    u.id === action.id ? { ...u, followed: true } : u,
                ),
            };
        }

        case 'HOME/UNFOLLOW': {
            return {
                ...state,
                users: state.users.map((u: UserType) =>
                    u.id === action.id ? { ...u, followed: false } : u,
                ),
            };
        }

        case 'HOME/SET_USERS': {
            return {
                ...state,
                users: action.users,
            };
        }

        case 'HOME/SET_USERS_COUNT': {
            return {
                ...state,
                usersCount: action.count,
            };
        }

        case 'HOME/SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.currentPage,
            };
        }

        case 'HOME/SET_PAGE_ARRAY': {
            return {
                ...state,
                pageArray: action.pageArray,
            };
        }

        case 'HOME/TOGGLE_USER_FOLLOW': {
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

type toggleUserFollowType = {
    type: 'HOME/TOGGLE_USER_FOLLOW';
    id: number;
    isFetching: boolean;
};

const toggleUserFollowAC = (id: number, isFetching: boolean): toggleUserFollowType => ({
    type: 'HOME/TOGGLE_USER_FOLLOW' as const,
    id,
    isFetching,
});

type FollowType = {
    type: 'HOME/FOLLOW';
    id: number;
};

const followAC = (id: number): FollowType => ({
    type: 'HOME/FOLLOW' as const,
    id,
});

type UnFollowType = {
    type: 'HOME/UNFOLLOW';
    id: number;
};

const unFollowAC = (id: number): UnFollowType => ({
    type: 'HOME/UNFOLLOW' as const,
    id,
});

type SetUsersType = {
    type: 'HOME/SET_USERS';
    users: UserType[];
};

const setUsersAC = (users: UserType[]): SetUsersType => ({
    type: 'HOME/SET_USERS' as const,
    users,
});

type SetUsersCountType = {
    type: 'HOME/SET_USERS_COUNT';
    count: number;
};

const setUsersCountAC = (count: number): SetUsersCountType => ({
    type: 'HOME/SET_USERS_COUNT',
    count,
});

type SetCurrentPageType = {
    type: 'HOME/SET_CURRENT_PAGE';
    currentPage: number;
};

export const setCurrentPageAC = (currentPage: number): SetCurrentPageType => ({
    type: 'HOME/SET_CURRENT_PAGE',
    currentPage,
});

type SetPagesType = {
    type: 'HOME/SET_PAGE_ARRAY';
    pageArray: number[];
};

const setPageBoxAC = (pageArray: Array<number>): SetPagesType => ({
    type: 'HOME/SET_PAGE_ARRAY' as const,
    pageArray,
});

type UnionTypes =
    | toggleUserFollowType
    | FollowType
    | UnFollowType
    | SetUsersType
    | SetUsersCountType
    | SetCurrentPageType
    | SetPagesType;

export const calcTotalPagesTC = (usersCount: number, pageSize: number): AppThunkType => {
    return dispatch => {
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

export const toggleFollow = (id: number, users: UserType[]): AppThunkType => {
    return async dispatch => {
        dispatch(toggleUserFollowAC(id, true));
        const user = users.filter(u => u.id === id);

        if (!user[0].followed) {
            const res = await followAPI(id);

            if (res.resultCode === 0) {
                dispatch(followAC(id));
            }
        } else {
            const res = await unFollowAPI(id);

            if (res.resultCode === 0) {
                dispatch(unFollowAC(id));
            }
        }
        dispatch(toggleUserFollowAC(id, false));
    };
};
