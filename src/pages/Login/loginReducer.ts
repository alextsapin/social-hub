/* eslint-disable no-console */
/* eslint-disable default-param-last */
import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

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
        case 'TOGGLE_IS_AUTH': {
            return {
                ...state,
                isAuth: action.isAuth,
            };
        }

        case 'SET_USER_ID': {
            return {
                ...state,
                userId: action.id,
            };
        }

        case 'SET_AVATAR_LINK': {
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
    type: 'TOGGLE_IS_AUTH';
    isAuth: boolean;
};

const toggleIsAuth = (isAuth: boolean): ToggleIsAuthType => ({
    type: 'TOGGLE_IS_AUTH' as const,
    isAuth,
});

type SetUserIdType = {
    type: 'SET_USER_ID';
    id: number | null;
};

const setUserId = (id: number | null): SetUserIdType => ({
    type: 'SET_USER_ID' as const,
    id,
});

type SetAvaLinkType = {
    type: 'SET_AVATAR_LINK';
    link: string | null;
};

const setAvaLinkAC = (link: string | null): SetAvaLinkType => ({
    type: 'SET_AVATAR_LINK',
    link,
});

export const authentication = () => {
    return async (dispatch: Dispatch) => {
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
            }
        } catch (error) {
            console.warn(error);
        }
    };
};

export const loginization = (data: LoginType) => {
    return async (dispatch: Dispatch) => {
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

export const logout = () => {
    return async (dispatch: Dispatch) => {
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
