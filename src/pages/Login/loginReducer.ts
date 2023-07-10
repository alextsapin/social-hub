/* eslint-disable no-console */
/* eslint-disable default-param-last */
import { AxiosError } from 'axios';

import { AppThunkType } from '../../App/store';
import { authAPI, LoginType, profileAPI } from '../../shared/api/api';

type StateType = {
    isAuth: boolean;
    userId: null | number;
    avaLink: null | string;
};

const initialState: StateType = {
    isAuth: false,
    userId: null,
    avaLink: null,
};

// eslint-disable-next-line prettier/prettier
const authReducer = (state = initialState, action: ToggleIsAuthType| SetUserIdType | SetAvaLinkType): StateType => {
    switch (action.type) {
        case 'LOGIN/TOGGLE_IS_AUTH': {
            return {
                ...state,
                isAuth: action.isAuth,
            };
        }

        case 'LOGIN/SET_USER_ID': {
            return {
                ...state,
                userId: action.id,
            };
        }

        case 'LOGIN/SET_AVATAR_LINK': {
            return {
                ...state,
                avaLink: action.link,
            };
        }

        default:
            return state;
    }
};

export default authReducer;

type ToggleIsAuthType = {
    type: 'LOGIN/TOGGLE_IS_AUTH';
    isAuth: boolean;
};

const toggleIsAuth = (isAuth: boolean): ToggleIsAuthType => ({
    type: 'LOGIN/TOGGLE_IS_AUTH' as const,
    isAuth,
});

type SetUserIdType = {
    type: 'LOGIN/SET_USER_ID';
    id: number | null;
};

const setUserId = (id: number | null): SetUserIdType => ({
    type: 'LOGIN/SET_USER_ID' as const,
    id,
});

type SetAvaLinkType = {
    type: 'LOGIN/SET_AVATAR_LINK';
    link: string | null;
};

export const setAvaLinkAC = (link: string | null): SetAvaLinkType => ({
    type: 'LOGIN/SET_AVATAR_LINK',
    link,
});

export const authentication = (): AppThunkType => {
    return async dispatch => {
        try {
            const res = await authAPI.authMe();

            if (res.data.resultCode === 0) {
                dispatch(toggleIsAuth(true));
                dispatch(setUserId(res.data.data.id));
                profileAPI.getUserProfileAPI(res.data.data.id).then(res => {
                    dispatch(setAvaLinkAC(res.data.photos.small));
                });
            } else {
                dispatch(toggleIsAuth(false));
                dispatch(setUserId(null));
                dispatch(setAvaLinkAC(null));
            }
        } catch (error) {
            console.warn(error);
        }
    };
};

export const loginization = (data: LoginType): AppThunkType => {
    return async dispatch => {
        try {
            const res = await authAPI.login(data);

            if (res.data.resultCode === 0) {
                dispatch(toggleIsAuth(true));
            } else {
                dispatch(toggleIsAuth(false));
            }
        } catch (error) {
            console.warn(error);
        }
    };
};

export const logout = (): AppThunkType => {
    return async dispatch => {
        try {
            const res = await authAPI.logout();

            if (res.data.resultCode === 0) {
                dispatch(toggleIsAuth(false));
                dispatch(setUserId(null));
                dispatch(setAvaLinkAC(null));
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                console.warn(error.message);
            } else {
                console.warn('Unexpected error...');
            }
        }
    };
};
