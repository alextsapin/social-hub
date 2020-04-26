import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '3d12e8f2-616a-4d41-84ec-74414192f495'
    }
});

export const peopleAPI = (page, limit) => {
    return instance.get(`users?page=${page}&count=${limit}`)
    .then(response => response.data);
}

export const followAPI = (id) => {
    return instance.post(`follow/${id}`, {})
    .then(response => {
        return response.data;
    });
}

export const unfollowAPI = (id) => {
    return instance.delete(`follow/${id}`)
    .then(response => {
        return response.data;
    });
}