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
    postBox: [
        { id: v1(), message: 'В Китае успешно проверили российские тест-системы на коронавирус.' },
        { id: v1(), message: 'Разработана система борьбы с астеройдами.' },
        { id: v1(), message: 'В Монголии нашли нефть.' },
    ],
    newPostText: '',
    userProfile: null,
};

export const profileReducer = (state = initialState, action: UnionType): StateType => {
    switch (action.type) {
        case 'UPDATE_POST': {
            return {
                ...state,
                newPostText: action.post,
            };
        }

        case 'ADD_POST': {
            const newPost = {
                id: v1(),
                message: state.newPostText,
            };

            return {
                ...state,
                postBox: [...state.postBox, newPost],
            };
        }

        case 'DELETE_POST': {
            return {
                ...state,
                postBox: [...state.postBox.filter((item: PostType) => item.id !== action.id)],
            };
        }

        case 'EDIT_POST': {
            return {
                ...state,
                postBox: [
                    ...state.postBox.map((item: PostType) =>
                        item.id === action.id ? { ...item, message: action.message } : item,
                    ),
                ],
            };
        }

        case 'SET_USER_PROFILE': {
            return {
                ...state,
                userProfile: action.userProfile,
            };
        }

        case 'SET_STATUS': {
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
    type: 'ADD_POST' as const,
});

export const updatePost = (post: string): UpdatePostType => ({
    type: 'UPDATE_POST' as const,
    post,
});

export const deletePost = (id: string): DeletePostType => ({
    type: 'DELETE_POST' as const,
    id,
});

export const editPost = (id: string, message: string): EditPostType => ({
    type: 'EDIT_POST' as const,
    id,
    message,
});

const setUserProfileAC = (userProfile: ProfileType): SetUserProfileType => ({
    type: 'SET_USER_PROFILE' as const,
    userProfile,
});

export const setStatusAC = (status: string): SetStatusType => ({
    type: 'SET_STATUS' as const,
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
