import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '3d12e8f2-616a-4d41-84ec-74414192f495'
    }
});

// Получим всех пользователей
export const PEOPLE_API = (page, limit) => {
    return instance.get(`users?page=${page}&count=${limit}`)
    .then(response => response.data);
}

// Функция ля подписки
export const FOLLOW_API = (id) => {
    return instance.post(`follow/${id}`, {})
    .then(response => {
        return response.data;
    });
}

// Функция для отписки
export const UNFOLLOW_API = (id) => {
    return instance.delete(`follow/${id}`)
    .then(response => {
        return response.data;
    });
}

// Получим профиль пользователя
export const PROFILE_API = (id) => {
    return instance.get(`profile/${id}`)
    .then(response => {
        return response.data;
    });
}