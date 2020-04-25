import * as axios from 'axios';

export const peopleAPI = (page, limit) => {
    return axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${limit}`,{
        withCredentials: true
    })
    .then(response => response.data);
}

export const followAPI = (id) => {
    return axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${id}`, {}, {withCredentials: true, headers: {
        'API-KEY': '3d12e8f2-616a-4d41-84ec-74414192f495'
    }})
    .then(response => {
        console.log(response)
    });
}

export const unfollowAPI = (id) => {
    return axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${id}`, {withCredentials: true, headers: {
        'API-KEY': '3d12e8f2-616a-4d41-84ec-74414192f495'
    }})
    .then(response => {
        console.log(response)
    });
}