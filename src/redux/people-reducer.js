// Первичный state
let initialState = {
    userData: [],
    pageSize: 10,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FOLLOW': 
            let stateCopy = {
                ...state,
                userData: [...state.userData],
                userData: state.userData.map(user => {
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
                userData: [...state.userData],
                userData: state.userData.map(user => {
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
            return {...state, userData: action.userData}
        } 

        case 'SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage} 
        }

        case 'SET_TOTAL_USER_COUNT': {
            return {...state, totalCount: action.count} 
        }

        case 'TOGGLE_IS_FETCHING': {
            return {
                ...state, isFetching: action.isFetching 
            } 
        }
        
        case 'TOGGLE_FOLLOWING_PROGRESS': {
            return {
                ...state, 
                followingInProgress: action.isFetching 
                ? [...state.followingInProgress, action.id]
                : state.followingInProgress.filter(id => id != action.id)
            } 
        }

        default: break;  
    }
    return state;
}

// ACTION CREATORS
export const follow = (id) => {
    return {
        type: 'FOLLOW',
        id
    }
}

export const unfollow = (id) => {
    return {
        type: 'UNFOLLOW',
        id
    }
}

export const setUserData = (userData) => {
    return {
        type: 'SET_USERS',
        userData
    }
}

export const setCurrentPage = (currentPage) => {
    return {
        type: 'SET_CURRENT_PAGE',
        currentPage
    }
}

export const setTotalUserCount = (count) => {
    return {
        type: 'SET_TOTAL_USER_COUNT',
        count
    }
}

export const toggleIsFetching = (isFetching) => {
    return {
        type: 'TOGGLE_IS_FETCHING',
        isFetching
    }
}

export const toggleFollowingProgress = (isFetching) => {
    return {
        type: 'TOGGLE_FOLLOWING_PROGRESS',
        isFetching
    }
}

export default userReducer;