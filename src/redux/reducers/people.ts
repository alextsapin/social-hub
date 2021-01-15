import {peopleAPI, followAPI, unfollowAPI} from '../../api/api';

import {Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from '../store';


type InitialStateType = {
    data: Array<{
        id: number
        name: string
        status: string
        photos: {
            small: string | null
            large: string| null
        }
        followed: boolean
    }> | null
    onPageUsers: number
    onPortionPage: number
    usersTotal: number
    currentPage: number
    isConnect: boolean
    followUsers: Array<number>
    filter: {
        term: string
    }
}

let initialState = {
    data: [{
        id: 2,
        name: '',
        status: '',
        photos: {
            small: null,
            large: null
        },
        followed: false
    }],
    onPageUsers: 20,
    onPortionPage: 5,
    usersTotal: 0,
    currentPage: 1,
    isConnect: false,
    followUsers: [],
    filter: {
        term: ''
    }
}

const peopleReducer = (state = initialState, action: GeneralACType): InitialStateType => {

    switch(action.type) {

        case 'FOLLOW': 
            let stateCopy = {
                ...state,
                data: state.data.map(user => {
                    if(user.id === action.id) {
                        return {...user, followed: true}
                    } else {
                        return user;
                    }
                })
            };
        return stateCopy;
        
        case 'UNFOLLOW': {
            let stateCopy = {
                ...state,
                data: state.data.map(user => {
                    if(user.id === action.id) {
                        return {...user, followed: false}
                    } else {
                        return user;
                    }
                })
            };
        return stateCopy; 
        }
        
        case 'SET_USERS': {
            return {...state, data: action.data}
        } 

        case 'SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage} 
        }

        case 'SET_TOTAL_USERS_COUNT': {
            return {...state, usersTotal: action.count} 
        }

        case 'TOGGLE_IS_FETCHING': {
            return {
                ...state, isConnect: action.isConnect
            } 
        }
        
        case 'TOGGLE_FOLLOWING': {
            return {
                ...state, 
                followUsers: action.isConnect 
                ? [...state.followUsers, action.id]
                : state.followUsers.filter(id => id !== action.id)
            } 
        }

        case 'SET_FILTER': {
            return {
                ...state, filter: action.payload
            } 
        }

        default: break;  
    }
    return state;
}

export default peopleReducer;

// ACTION CREATORS
type SetFilterACType =  {
    type: string,
    payload: {
        term: string
    }
}

const setFilterAC = (term: string) => {
    return {
        type: 'SET_FILTER',
        payload: {term}
    }
}


type FollowACType = {
    type: string
    id: number
}

const followAC = (id: number): FollowACType => {
    return {
        type: 'FOLLOW',
        id
    }
}

type UnfollowACType = {
    type: string
    id: number
}

const unfollowAC = (id: number): UnfollowACType => {
    return {
        type: 'UNFOLLOW',
        id
    }
}

type SetUsersDataACType = {
    type: string
    data: Array<{
        id: number
        name: string
        status: string
        photos: {
            small: string | null
            large: string| null
        }
        followed: boolean
    }> | null
}

const setUsersDataAC = (data: any): SetUsersDataACType => {
    return {
        type: 'SET_USERS',
        data
    }
}

type SetCurrentPageACType = {
    type: string
    currentPage: number
}

const setCurrentPageAC = (currentPage: number): SetCurrentPageACType => {
    return {
        type: 'SET_CURRENT_PAGE',
        currentPage
    }
}

type setUsersCountACType = {
    type: string
    count: number
}

const setUsersCountAC = (count: number): setUsersCountACType => {
    return {
        type: 'SET_TOTAL_USERS_COUNT',
        count
    }
}

type ToggleIsConnectACType = {
    type: string
    isConnect: boolean
}

const toggleIsConnectAC = (isConnect: boolean): ToggleIsConnectACType => {
    return {
        type: 'TOGGLE_IS_FETCHING',
        isConnect
    }
}

type ToggleFollowingACType = {
    type: string
    isConnect: boolean
    id: number
}

const toggleFollowingAC = (isConnect: boolean, id: number): ToggleFollowingACType => {
    return {
        type: 'TOGGLE_FOLLOWING',
        isConnect,
        id
    }
}

type GeneralACType = FollowACType & UnfollowACType & SetUsersDataACType & setUsersCountACType &SetCurrentPageACType & ToggleIsConnectACType & ToggleFollowingACType & SetFilterACType;


// Thunk creators
export const getUsersTC = (page: number, size: number, term: string) => {
    return (dispatch: Dispatch) => {
        // Покажем прелоадер
        dispatch(toggleIsConnectAC(true));    
        peopleAPI(page, size, term).then(data => {
            // Получим количество пользователей
            dispatch(setUsersCountAC(data.totalCount));
            // Получим пользователей
            dispatch(setUsersDataAC(data.items));
            // Убрем прелоадер
            dispatch(toggleIsConnectAC(false));
        });
    }
}

export const pageChangeTC = (page: number, size: number) => {
    return (dispatch: Dispatch) => {
        // Покажем прелоадер
        dispatch(toggleIsConnectAC(true));
        // Установим текущую страницу
        dispatch(setCurrentPageAC(page));
        // Получим пользователей
        peopleAPI(page, size).then(data => {
            dispatch(setUsersDataAC(data.items));
            // Уберем прелоадер
            dispatch(toggleIsConnectAC(false));
        });
    }
}

export const followTC = (id: number) => {
    return (dispatch: Dispatch) => {
        // Заблокируем кнопку
        dispatch(toggleFollowingAC(true, id));
        followAPI(id).then(data => {
            if(data.resultCode === 0) {
                dispatch(followAC(id));
                // Разблокируем кнопку
                dispatch(toggleFollowingAC(false, id));
            }
        });
    }
}

export const unfollowTC = (id: number) => {
    return (dispatch: Dispatch) => {
        // Заблокируем кнопку
        dispatch(toggleFollowingAC(true, id));
        unfollowAPI(id).then(data => {
            if(data.resultCode === 0) {
                dispatch(unfollowAC(id));
                // Разблокируем кнопку
                dispatch(toggleFollowingAC(false, id));
            }
        });
    }
}
