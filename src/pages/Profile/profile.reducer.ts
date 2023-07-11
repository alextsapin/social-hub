/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable default-param-last */
import { v1 } from 'uuid';

import { AppThunkType } from '../../App/store';
import { PostType } from '../../entities/Post/Post';
import { profileAPI } from '../../shared/api/api';
import { setAvaLinkAC } from '../Login/loginReducer';

import {
    StateType,
    ProfileType,
    AddPostType,
    UpdatePostType,
    DeletePostType,
    EditPostType,
    SetUserProfileType,
    SetStatusType,
    SetAvatarType,
    UnionType,
} from './types';

const initialState: StateType = {
    status: null,
    posts: [
        {
            id: v1(),
            message: 'China has successfully tested Russian test systems for coronavirus.',
        },
        { id: v1(), message: 'A system for combating asteroids has been developed. ☄️' },
        { id: v1(), message: 'Oil found in Mongolia.' },
    ],
    text: '',
    userProfile: {} as ProfileType,
};

export const profileReducer = (state = initialState, action: UnionType): StateType => {
    switch (action.type) {
        case 'PROFILE/UPDATE_POST': {
            return {
                ...state,
                text: action.post,
            };
        }

        case 'PROFILE/ADD_POST': {
            const newPost = {
                id: v1(),
                message: state.text,
            };

            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        }

        case 'PROFILE/DELETE_POST': {
            return {
                ...state,
                posts: [...state.posts.filter((item: PostType) => item.id !== action.id)],
            };
        }

        case 'PROFILE/EDIT_POST': {
            return {
                ...state,
                posts: [
                    ...state.posts.map((item: PostType) =>
                        item.id === action.id ? { ...item, message: action.message } : item,
                    ),
                ],
            };
        }

        case 'PROFILE/SET_USER_PROFILE': {
            return {
                ...state,
                userProfile: action.userProfile,
            };
        }

        case 'PROFILE/SET_STATUS': {
            return {
                ...state,
                status: action.status,
            };
        }

        case 'PROFILE/SET_AVATAR': {
            return {
                ...state,
                userProfile: {
                    ...state.userProfile,
                    photos: { small: action.small, large: action.large },
                },
            };
        }

        default: {
            return state;
        }
    }
};

export const addPost = (): AddPostType => ({
    type: 'PROFILE/ADD_POST' as const,
});

export const updatePost = (post: string): UpdatePostType => ({
    type: 'PROFILE/UPDATE_POST' as const,
    post,
});

export const deletePost = (id: string): DeletePostType => ({
    type: 'PROFILE/DELETE_POST' as const,
    id,
});

export const editPost = (id: string, message: string): EditPostType => ({
    type: 'PROFILE/EDIT_POST' as const,
    id,
    message,
});

const setUserProfileAC = (userProfile: ProfileType): SetUserProfileType => ({
    type: 'PROFILE/SET_USER_PROFILE' as const,
    userProfile,
});

export const setStatusAC = (status: string): SetStatusType => ({
    type: 'PROFILE/SET_STATUS' as const,
    status,
});

export const setAvatarSuccess = (small: string | null, large: string | null): SetAvatarType => {
    return {
        type: 'PROFILE/SET_AVATAR' as const,
        small,
        large,
    };
};

// Thunks
export const setAvatarTC = (file: File): AppThunkType => {
    return dispatch => {
        profileAPI.setAvatarAPI(file).then(res => {
            console.log(res.data.photos);
            dispatch(setAvatarSuccess(res.data.photos.small, res.data.photos.large));
            dispatch(setAvaLinkAC(res.data.photos.small));
        });
    };
};

export const getUserProfileTC = (id: number): AppThunkType => {
    return dispatch => {
        profileAPI.getUserProfileAPI(id).then(res => {
            dispatch(setUserProfileAC(res.data));
        });
    };
};

export const getStatus = (id: number): AppThunkType => {
    return async dispatch => {
        const res = await profileAPI.getStatus(id);

        dispatch(setStatusAC(res.data));
    };
};

export const setStatusTC = (status: string): AppThunkType => {
    return async dispatch => {
        const res = await profileAPI.setStatus(status);

        if (res.status === 200) {
            dispatch(setStatusAC(status));
        } else {
            console.warn('Network error...');
        }
    };
};
