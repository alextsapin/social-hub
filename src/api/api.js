import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '44e63aad-21a5-4b72-9cf5-77d24b5669cc'
    }
});

// Получим данные авторизации
export const setAvatarAPI = (photoFile) => {
    let formData = new FormData();
    formData.append('image', photoFile);
    return instance.put(`profile/photo`, formData, {headers: {
        'Content-Type': 'multipart/form-data'}
    }).then(response => {
        return response.data; 
    });
}

// Получим данные авторизации
export const authAPI = () => {
    return instance.get(`auth/me`).then(response => {
        return response.data; 
    });
}

// Login
export const loginAPI = (email, password, rememberMe = false, captcha = null) => {
    return instance.post(`auth/login`, {email, password, rememberMe, captcha}).then(response => {
        return response.data; 
    });
}

// Logout
export const logoutAPI = () => {
    return instance.delete(`auth/login`).then(response => {
        return response.data; 
    });
}

// Получим всех пользователей
export const peopleAPI = (page, limit) => {
    return instance.get(`users?page=${page}&count=${limit}`)
    .then(response => response.data);
}

// Функция ля подписки
export const followAPI = (id) => {
    return instance.post(`follow/${id}`, {})
    .then(response => {
        return response.data;
    });
}

// Функция для отписки
export const unfollowAPI = (id) => {
    return instance.delete(`follow/${id}`)
    .then(response => {
        return response.data;
    });
}

// Получим профиль пользователя
export const getProfileAPI = (id) => {
    return instance.get(`profile/${id}`)
    .then(response => {
        return response.data;
    });
}

// Получим профиль пользователя
export const getStatusAPI = (id) => {
    return instance.get(`profile/status/${id}`)
    .then(response => {
        return response.data;
    });
}

// Получим профиль пользователя
export const updateStatusAPI = (text) => {
    return instance.put(`profile/status`, {status: text})
    .then(response => {
        return response.data;
    });
}

// Получим профиль пользователя
export const saveProfileAPI = (data) => {
    return instance.put(`profile/`, data)
    .then(response => {
        return response.data;
    });
}

// Капча
export const getCaptchaUrlAPI = () => {
    return instance.get(`security/get-captcha-url`);
}