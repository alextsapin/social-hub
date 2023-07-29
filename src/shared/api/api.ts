/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '1f975373-0b21-436f-bd12-e9e6f63d529e',
    },
});

export type LoginType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: string;
};

export const authAPI = {
    async authMe() {
        return instance.get(`auth/me`);
    },
    async login(data: LoginType) {
        return instance.post(`auth/login`, data);
    },
    async logout() {
        return instance.delete(`auth/login`);
    },
};

export const usersAPI = {
    async getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`);
    },
};

enum ResultCodeEnum {
    success = 0,
    error = 1,
    captchaIsRequired = 10,
}

type ResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D;
    messages: Array<string>;
    resultCode: RC;
};

type PhotosType = {
    photos: {
        small: string | null;
        large: string | null;
    };
};

export type ProfileData = {
    userId: number | null;
    lookingForAJob: boolean | null;
    lookingForAJobDescription: string | null;
    fullName: string | null;
    contacts: {
        github: string | null;
        vk: string | null;
        facebook: string | null;
        instagram: string | null;
        twitter: string | null;
        website: string | null;
        youtube: string | null;
        mainLink: string | null;
    };
};

export const profileAPI = {
    async updateProfile(data: ProfileData) {
        return instance.put(`profile/`, data);
    },
    async getStatus(id: number) {
        return instance.get(`profile/status/${id}`);
    },
    async setStatus(status: string) {
        return instance.put(`profile/status/`, { status });
    },
    async getUserProfileAPI(id: number) {
        return instance.get(`profile/${id}`);
    },
    async setAvatarAPI(file: File) {
        const formData = new FormData();

        formData.append('image', file);

        return instance
            .put<ResponseType<PhotosType>>(`profile/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                return response.data;
            });
    },
};

export const followAPI = async (id: number) => {
    const response = await instance.post(`follow/${id}`, {});

    return response.data;
};

export const unFollowAPI = async (id: number) => {
    const response = await instance.delete(`follow/${id}`);

    return response.data;
};
