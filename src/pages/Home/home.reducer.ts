/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable default-param-last */
import { AppThunkType } from '../../App/store';
import { followAPI, unFollowAPI, usersAPI } from '../../shared/api/api';
import { codeSuccess } from '../../shared/constants';

import {
    ToggleIsFetching,
    SetSectionNumberType,
    FollowType,
    HomeActionsType,
    HomeStateType,
    SetCurrentPageType,
    SetUsersCountType,
    SetUsersType,
    ToggleUserFollowType,
    UnFollowType,
    UserType,
} from './home.types';

const initialState: HomeStateType = {
    isFetching: false,
    followUsers: [],
    users: [],
    usersCount: 0,
    currentPage: 1,
    pageSize: 16,
    sectionNumber: 1,
    sectionSize: 5,
};

export const homeReducer = (state = initialState, action: HomeActionsType): HomeStateType => {
    switch (action.type) {
        case 'HOME/TOGGLE_IS_FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching,
            };
        }

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

        case 'HOME/SET_SECTION': {
            return {
                ...state,
                sectionNumber: action.section,
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

const toggleIsFetching = (isFetching: boolean): ToggleIsFetching => ({
    type: 'HOME/TOGGLE_IS_FETCHING' as const,
    isFetching,
});

const toggleUserFollowAC = (id: number, isFetching: boolean): ToggleUserFollowType => ({
    type: 'HOME/TOGGLE_USER_FOLLOW' as const,
    id,
    isFetching,
});

const followAC = (id: number): FollowType => ({
    type: 'HOME/FOLLOW' as const,
    id,
});

const unFollowAC = (id: number): UnFollowType => ({
    type: 'HOME/UNFOLLOW' as const,
    id,
});

const setUsersAC = (users: UserType[]): SetUsersType => ({
    type: 'HOME/SET_USERS' as const,
    users,
});

const setUsersCountAC = (count: number): SetUsersCountType => ({
    type: 'HOME/SET_USERS_COUNT',
    count,
});

export const setCurrentPageAC = (currentPage: number): SetCurrentPageType => ({
    type: 'HOME/SET_CURRENT_PAGE',
    currentPage,
});

export const setSectionNumber = (section: number): SetSectionNumberType => ({
    type: 'HOME/SET_SECTION' as const,
    section,
});

// eslint-disable-next-line prettier/prettier
export const getUsersTC = (currentPage: number, pageSize: number): AppThunkType => {
    return async dispatch => {
        dispatch(toggleIsFetching(true));
        try {
            const res = await usersAPI.getUsers(currentPage, pageSize);

            if (res.status === codeSuccess) {
                setCurrentPageAC(currentPage);
                dispatch(setUsersAC(res.data.items));
                dispatch(setUsersCountAC(res.data.totalCount));
            } else {
                console.warn('Network error...');
            }
        } catch {
            console.warn('Get users error...');
        } finally {
            dispatch(toggleIsFetching(false));
        }
    };
};

export const toggleFollow = (id: number, users: UserType[]): AppThunkType => {
    return async dispatch => {
        dispatch(toggleUserFollowAC(id, true));
        const user = users.filter(u => u.id === id);

        if (!user[0].followed) {
            try {
                const res = await followAPI(id);

                if (res.resultCode === 0) {
                    dispatch(followAC(id));
                }
            } catch (error) {
                console.log(error);
            } finally {
                dispatch(toggleUserFollowAC(id, false));
            }
        } else {
            try {
                const res = await unFollowAPI(id);

                if (res.resultCode === 0) {
                    dispatch(unFollowAC(id));
                }
            } catch (error) {
                console.log(error);
            } finally {
                dispatch(toggleUserFollowAC(id, false));
            }
        }
    };
};
