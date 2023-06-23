/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable default-param-last */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch } from 'redux';
import { v1 } from 'uuid';

import { PostType } from '../../entities/Post/Post';
import { profileAPI } from '../../shared/api/api';

export type ProfileType = {
    userId: number;
    fullName: string;
    aboutMe: string;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    contacts: {
        facebook: string | null;
        github: string | null;
        instagram: string | null;
        mainLink: string | null;
        twitter: string | null;
        vk: string | null;
        website: string | null;
        youtube: string | null;
    };
    photos: {
        small: string | null;
        large: string | null;
    };
};

export type StateType = {
    status: null | string;
    postBox: PostType[];
    newPostText: string;
    userProfile: ProfileType | null;
};

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

const profileReducer = (state = initialState, action: any) => {
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

type AddPostType = {
    type: 'ADD_POST';
};

export const addPostAC = (): AddPostType => ({
    type: 'ADD_POST',
});

type UpdatePostType = {
    type: 'UPDATE_POST';
    post: string;
};

const updatePostAC = (post: string): UpdatePostType => ({
    type: 'UPDATE_POST',
    post,
});

const deletePostAC = (id: string) => ({
    type: 'DELETE_POST',
    id,
});

const editPostAC = (id: string, message: string) => ({
    type: 'EDIT_POST',
    id,
    message,
});

type SetUserProfile = {
    type: 'SET_USER_PROFILE';
    userProfile: ProfileType;
};

const setUserProfileAC = (userProfile: ProfileType): SetUserProfile => ({
    type: 'SET_USER_PROFILE',
    userProfile,
});

export const setStatusAC = (status: string) => ({
    type: 'SET_STATUS',
    status,
});

// Thunk creators
export const addPostTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(addPostAC());
    };
};

export const updatePostTC = (post: string) => {
    return (dispatch: Dispatch) => {
        dispatch(updatePostAC(post));
    };
};

export const deletePostTC = (id: string) => {
    return (dispatch: Dispatch) => {
        dispatch(deletePostAC(id));
    };
};

export const editPostTC = (id: string, newText: string) => {
    return (dispatch: Dispatch) => {
        dispatch(editPostAC(id, newText));
    };
};

export const getUserProfileTC = (id: number) => {
    return (dispatch: Dispatch) => {
        profileAPI.getUserProfileAPI(id).then(res => {
            dispatch(setUserProfileAC(res.data));
        });
    };
};

export const getStatus = (id: number) => {
    return async (dispatch: Dispatch) => {
        const res = await profileAPI.getStatus(id);

        dispatch(setStatusAC(res.data));
    };
};

export const setStatusTC = (status: string) => {
    return async (dispatch: Dispatch) => {
        const res = await profileAPI.setStatus(status);

        dispatch(setStatusAC(status));
    };
};

export default profileReducer;
