import axios, {AxiosResponse} from 'axios';
import {PersonType} from '../types/person';

export enum ResultCodeEnum {
    success = 0,
    error = 1,
    captchaIsRequired = 10
}

type ResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '1f975373-0b21-436f-bd12-e9e6f63d529e'
    }
});

type PhotosType = {
    photos: {
        small: string | null
        large: string | null
    }
}

// Получим данные авторизации
export const setAvatarAPI = (photoFile: any) => {
    let formData = new FormData();
    formData.append('image', photoFile);
    return instance.put<ResponseType<PhotosType>>(`profile/photo`, formData, {headers: {
        'Content-Type': 'multipart/form-data'}
    }).then(response => {
        return response.data; 
    });
}

type AuthType = {
    id: number
    login: string
    email: string
}

// Получим данные авторизации
export const authAPI = () => {
    return instance.get<ResponseType<AuthType>>(`auth/me`).then((response) => {
        return response.data; 
    });
}

type LoginType = {
    userId: number
}

// Login
export const loginAPI = (email: string, password: string, rememberMe: boolean, captcha: null | string) => {
    return instance.post<ResponseType<LoginType>>(`auth/login`, {email, password, rememberMe, captcha}).then(response => {
        return response.data; 
    });
}

// Logout
export const logoutAPI = () => {
    return instance.delete(`auth/login`).then(response => {
        return response.data; 
    });
}

type PeopleType = {
    items: Array<PersonType>
    totalCount: number
    error: string | null
}

// Получим всех пользователей
export const peopleAPI = (page: number, limit: number) => {
    return instance.get<PeopleType>(`users?page=${page}&count=${limit}`)
    .then(response => response.data);
}

// Функция ля подписки
export const followAPI = (id: number) => {
    return instance.post<ResponseType>(`follow/${id}`, {})
    .then(response => {
        return response.data;
    });
}

// Функция для отписки
export const unfollowAPI = (id: number) => {
    return instance.delete(`follow/${id}`)
    .then(response => {
        return response.data as Promise<ResponseType>
    });
}

// Получим профиль пользователя
export const getProfileAPI = (id: number) => {
    return instance.get(`profile/${id}`)
    .then(response => {
        return response.data;
    });
}

// Получим профиль пользователя
export const getStatusAPI = (id: number) => {
    return instance.get(`profile/status/${id}`)
    .then(response => {
        return response.data;
    });
}

// Получим профиль пользователя
export const updateStatusAPI = (text: string) => {
    return instance.put<ResponseType>(`profile/status`, {status: text})
    .then(response => {
        return response.data;
    });
}

// Получим профиль пользователя
export const saveProfileAPI = (data: any) => {
    return instance.put(`profile/`, data)
    .then(response => {
        return response.data;
    });
}

type GetCaptchaUrlType = {
    url: string
}

// Капча
export const getCaptchaUrlAPI = () => {
    return instance.get<GetCaptchaUrlType>(`security/get-captcha-url`);
}