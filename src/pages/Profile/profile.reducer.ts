/* eslint-disable no-magic-numbers */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable default-param-last */
import { v1 } from 'uuid';

import { AppThunkType } from '../../App/store';
import { PostType } from '../../entities/Post/Post';
import { profileAPI } from '../../shared/api/api';

import {
    StateType,
    ProfileType,
    AddPostType,
    UpdatePostType,
    DeletePostType,
    EditPostType,
    SetUserProfileType,
    SetStatusType,
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
    userProfile: null,
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

// Thunks
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
