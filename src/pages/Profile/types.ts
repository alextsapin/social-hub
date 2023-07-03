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
    posts: PostType[];
    text: string;
    userProfile: ProfileType | null;
};

export type AddPostType = {
    type: 'PROFILE/ADD_POST';
};

export type UpdatePostType = {
    type: 'PROFILE/UPDATE_POST';
    post: string;
};

export type DeletePostType = {
    type: 'PROFILE/DELETE_POST';
    id: string;
};

export type EditPostType = {
    type: 'PROFILE/EDIT_POST';
    id: string;
    message: string;
};

export type SetStatusType = {
    type: 'PROFILE/SET_STATUS';
    status: string | null;
};

export type SetUserProfileType = {
    type: 'PROFILE/SET_USER_PROFILE';
    userProfile: ProfileType;
};

export type UnionType =
    | AddPostType
    | UpdatePostType
    | DeletePostType
    | EditPostType
    | SetStatusType
    | SetUserProfileType;
