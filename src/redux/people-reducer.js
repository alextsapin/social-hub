// DAL
import {
    PEOPLE_API, 
    FOLLOW_API, 
    UNFOLLOW_API
} from '../api/api.js';

// Первичный state
let initialState = {
    data: [],
    pageSize: 5,
    TOTAL_COUNT: 0,
    CURRENT_PAGE: 1,
    IS_CONNECT: false,
    FOLLOW_ARRAY: []
}

const PEOPLE_REDUCER = (state = initialState, action) => {
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
            return {...state, CURRENT_PAGE: action.CURRENT_PAGE} 
        }

        case 'SET_TOTAL_USER_COUNT': {
            return {...state, TOTAL_COUNT: action.count} 
        }

        case 'TOGGLE_IS_FETCHING': {
            return {
                ...state, IS_CONNECT: action.IS_CONNECT 
            } 
        }
        
        case 'TOGGLE_FOLLOWING': {
            return {
                ...state, 
                FOLLOW_ARRAY: action.IS_CONNECT 
                ? [...state.FOLLOW_ARRAY, action.ID]
                : state.FOLLOW_ARRAY.filter(id => id != action.ID)
            } 
        }

        default: break;  
    }
    return state;
}

// ACTION CREATORS
export const FOLLOW_AC = (id) => {
    return {
        type: 'FOLLOW',
        id
    }
}

export const UNFOLLOW_AC = (id) => {
    return {
        type: 'UNFOLLOW',
        id
    }
}

export const SET_USERS_DATA_AC = (data) => {
    return {
        type: 'SET_USERS',
        data
    }
}

export const SET_CURRENT_PAGE_AC = (CURRENT_PAGE) => {
    return {
        type: 'SET_CURRENT_PAGE',
        CURRENT_PAGE
    }
}

export const SET_USERS_COUNT_AC = (count) => {
    return {
        type: 'SET_TOTAL_USER_COUNT',
        count
    }
}

export const TOGGLE_IS_CONNECT_AC = (IS_CONNECT) => {
    return {
        type: 'TOGGLE_IS_FETCHING',
        IS_CONNECT
    }
}

export const TOGGLE_FOLLOWING_AC = (IS_CONNECT, ID) => {
    return {
        type: 'TOGGLE_FOLLOWING',
        IS_CONNECT,
        ID
    }
}

export default PEOPLE_REDUCER;

export const getUsersThunkCreator = (currentPage, pageSize) => {
    return (dispatch) => {
        // Покажем прелоадер
        dispatch(TOGGLE_IS_CONNECT_AC(true));    
        PEOPLE_API(currentPage, pageSize).then(data => {
            // Получим количество пользователей
            dispatch(SET_USERS_COUNT_AC(data.totalCount));
            dispatch(SET_USERS_COUNT_AC(25));
            // Получим пользователей
            dispatch(SET_USERS_DATA_AC(data.items));
            // Убрем прелоадер
            dispatch(TOGGLE_IS_CONNECT_AC(false));
        });
    }
}

export const pageChangeThunkCreator = (page, size) => {
    return (dispatch) => {
        // Покажем прелоадер
        dispatch(TOGGLE_IS_CONNECT_AC(true));
        // Установим текущую страницу
        dispatch(SET_CURRENT_PAGE_AC(page));
        // Получим пользователей
        PEOPLE_API(page, size).then(data => {
            dispatch(SET_USERS_DATA_AC(data.items));
            // Покажем прелоадер
            dispatch(TOGGLE_IS_CONNECT_AC(false));
        });
    }
}

export const followThunkCreator = (id) => {
    return (dispatch) => {
        // Заблокируем кнопку
        dispatch(TOGGLE_FOLLOWING_AC(true, id));
        FOLLOW_API(id).then(data => {
            if(data.resultCode == 0) {
                dispatch(FOLLOW_AC(id));
                // Разблокируем кнопку
                dispatch(TOGGLE_FOLLOWING_AC(false, id));
            }
        });
    }
}

export const unfollowThunkCreator = (id) => {
    return (dispatch) => {
        // Заблокируем кнопку
        dispatch(TOGGLE_FOLLOWING_AC(true, id));
        UNFOLLOW_API(id).then(data => {
            if(data.resultCode == 0) {
                dispatch(UNFOLLOW_AC(id));
                // Разблокируем кнопку
                dispatch(TOGGLE_FOLLOWING_AC(false, id));
            }
        });
    }
}