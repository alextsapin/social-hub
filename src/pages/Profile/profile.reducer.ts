/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable default-param-last */
import { AxiosError } from 'axios';
import { v1 } from 'uuid';

import { setError } from '../../App/App.reducer';
import { AppThunkType } from '../../App/store';
import { PostType } from '../../entities/Post/Post';
import { profileAPI } from '../../shared/api/api';
import { codeSuccess } from '../../shared/constants';
import { ValuesType } from '../../widgets/ProfileForm/ProfileForm';
import { setAvaLinkAC } from '../Login/login.reducer';

import {
    ProfileState,
    ProfileType,
    AddPostType,
    UpdatePostType,
    DeletePostType,
    EditPostType,
    SetUserProfileType,
    SetStatusType,
    SetAvatarType,
    ToggleIsUpload,
    UnionType,
} from './profile.types';

const initialState: ProfileState = {
    isUploadAva: false,
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

export const profileReducer = (state = initialState, action: UnionType): ProfileState => {
    switch (action.type) {
        case 'PROFILE/TOGGLE_UPLOAD_AVA': {
            return {
                ...state,
                isUploadAva: action.isUploadAva,
            };
        }

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

export const toggleIsUpload = (isUploadAva: boolean): ToggleIsUpload => ({
    type: 'PROFILE/TOGGLE_UPLOAD_AVA' as const,
    isUploadAva,
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
    return async dispatch => {
        dispatch(toggleIsUpload(true));
        try {
            const res = await profileAPI.setAvatarAPI(file);

            if (res.resultCode === 0) {
                dispatch(setAvatarSuccess(res.data.photos.small, res.data.photos.large));
                dispatch(setAvaLinkAC(res.data.photos.small));
            } else {
                dispatch(setError(res.messages[0]));
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                dispatch(setError(error.message));
            } else {
                dispatch(setError('Unexpected error...'));
            }
        } finally {
            dispatch(toggleIsUpload(false));
        }
    };
};

export const getUserProfileTC = (id: number): AppThunkType => {
    return async dispatch => {
        try {
            const res = await profileAPI.getUserProfileAPI(id);

            dispatch(setUserProfileAC(res.data));
        } catch (error) {
            if (error instanceof AxiosError) {
                dispatch(setError(error.message));
            } else {
                dispatch(setError('Unexpected error...'));
            }
        }
    };
};

export const updateProfile = (data: ValuesType): AppThunkType => {
    return async dispatch => {
        try {
            const res = await profileAPI.updateProfile({
                userId: data.userId,
                fullName: data.fullName,
                aboutMe: data.aboutMe,
                lookingForAJob: data.lookingForAJob,
                lookingForAJobDescription: data.lookingForAJobDescription,
                contacts: {
                    facebook: data.facebook,
                    github: data.github,
                    instagram: data.instagram,
                    mainLink: null,
                    twitter: data.twitter,
                    vk: data.vk,
                    website: data.website,
                    youtube: data.youtube,
                },
            });

            if (res.data.resultCode === 0) {
                dispatch(getUserProfileTC(data.userId));
            } else {
                dispatch(setError(res.data.messages[0]));
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                dispatch(setError(error.message));
            } else {
                dispatch(setError('Unexpected error...'));
            }
        }
    };
};

export const getStatus = (id: number): AppThunkType => {
    return async dispatch => {
        try {
            const res = await profileAPI.getStatus(id);

            dispatch(setStatusAC(res.data));
        } catch (error) {
            if (error instanceof AxiosError) {
                dispatch(setError(error.message));
            } else {
                dispatch(setError('Unexpected error...'));
            }
        }
    };
};

export const setStatusTC = (status: string): AppThunkType => {
    return async dispatch => {
        try {
            const res = await profileAPI.setStatus(status);

            if (res.data.resultCode === 0) {
                dispatch(setStatusAC(status));
            } else {
                dispatch(setError(res.data.messages[0]));
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                dispatch(setError(error.message));
            } else {
                dispatch(setError('Unexpected error...'));
            }
        }
    };
};
