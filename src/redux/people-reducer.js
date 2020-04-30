// Первичный state
let INITIAL_STATE = {
    USER_DATA: [],
    PAGE_SIZE: 5,
    TOTAL_COUNT: 0,
    CURRENT_PAGE: 1,
    IS_CONNECT: false,
    FOLLOW_ARRAY: []
}

const PEOPLE_REDUCER = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'FOLLOW': 
            let stateCopy = {
                ...state,
                USER_DATA: [...state.USER_DATA],
                USER_DATA: state.USER_DATA.map(user => {
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
                USER_DATA: [...state.USER_DATA],
                USER_DATA: state.USER_DATA.map(user => {
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
            return {...state, USER_DATA: action.USER_DATA}
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

export const SET_USERS_DATA_AC = (USER_DATA) => {
    return {
        type: 'SET_USERS',
        USER_DATA
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