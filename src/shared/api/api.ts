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

export const profileAPI = {
    async getStatus(id: number) {
        return instance.get(`profile/status/${id}`);
    },
    async setStatus(status: string) {
        return instance.put(`profile/status/`, { status });
    },
    async getUserProfileAPI(id: number) {
        return instance.get(`profile/${id}`);
    },
};

export const followAPI = async (id: number) => {
    const response = await instance.post(`follow/${id}`, {});

    return response.data.resultCode;
};

export const unFollowAPI = async (id: number) => {
    const response = await instance.delete(`follow/${id}`);

    return response.data.resultCode;
};
