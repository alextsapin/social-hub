// DAL
import {peopleAPI, followAPI, unfollowAPI} from '../../api/api.js';

// Первичный state
let initialState = {
    data: [],
    onPageUsers: 5,
    onPortionPage: 5,
    usersTotal: 0,
    currentPage: 1,
    isConnect: false,
    followUsers: []
}

const peopleReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'FOLLOW': 
            let stateCopy = {
                ...state,
                data: [...state.data],
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
                data: [...state.data],
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

        default: break;  
    }
    return state;
}

// ACTION CREATORS
const followAC = (id) => {
    return {
        type: 'FOLLOW',
        id
    }
}

const unfollowAC = (id) => {
    return {
        type: 'UNFOLLOW',
        id
    }
}

const setUsersDataAC = (data) => {
    return {
        type: 'SET_USERS',
        data
    }
}

const setCurrentPageAC = (currentPage) => {
    return {
        type: 'SET_CURRENT_PAGE',
        currentPage
    }
}

const setUsersCountAC = (count) => {
    return {
        type: 'SET_TOTAL_USERS_COUNT',
        count
    }
}

const toggleIsConnectAC = (isConnect) => {
    return {
        type: 'TOGGLE_IS_FETCHING',
        isConnect
    }
}

const toggleFollowingAC = (isConnect, id) => {
    return {
        type: 'TOGGLE_FOLLOWING',
        isConnect,
        id
    }
}

export default peopleReducer;

// Thunk creators
export const getUsersTC = (page, size) => {
    return (dispatch) => {
        // Покажем прелоадер
        dispatch(toggleIsConnectAC(true));    
        peopleAPI(page, size).then(data => {
            // Получим количество пользователей
            dispatch(setUsersCountAC(data.totalCount));
            // Получим пользователей
            dispatch(setUsersDataAC(data.items));
            // Убрем прелоадер
            dispatch(toggleIsConnectAC(false));
        });
    }
}

export const pageChangeTC = (page, size) => {
    return (dispatch) => {
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

export const followTC = (id) => {
    return (dispatch) => {
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

export const unfollowTC = (id) => {
    return (dispatch) => {
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