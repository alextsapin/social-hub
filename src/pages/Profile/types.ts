import { PostType } from '../../entities/Post/Post';

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

export type AddPostType = {
    type: 'ADD_POST';
};

export type UpdatePostType = {
    type: 'UPDATE_POST';
    post: string;
};

export type DeletePostType = {
    type: 'DELETE_POST';
    id: string;
};

export type EditPostType = {
    type: 'EDIT_POST';
    id: string;
    message: string;
};

export type SetStatusType = {
    type: 'SET_STATUS';
    status: string | null;
};

export type SetUserProfileType = {
    type: 'SET_USER_PROFILE';
    userProfile: ProfileType;
};

export type UnionType =
    | AddPostType
    | UpdatePostType
    | DeletePostType
    | EditPostType
    | SetStatusType
    | SetUserProfileType;
