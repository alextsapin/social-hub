import { AppStateType } from '../../App/store';
import { PostType } from '../../entities/Post/Post';
import { ProfileType } from '../../pages/Profile/profileReducer';

export const getNewPostTextSL = (state: AppStateType): string => {
    return state.profile.newPostText;
};

// Получим поисковую строку
export const getPostBoxSL = (state: AppStateType): PostType[] => {
    return state.profile.postBox;
};

export const getUserProfileSL = (state: AppStateType): ProfileType | null => {
    return state.profile.userProfile;
};

export const getStatusSL = (state: AppStateType): string | null => {
    return state.profile.status;
};

export const getUserIdSL = (state: AppStateType): number | null => {
    return state.auth.userId;
};
