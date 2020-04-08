// Первичный state
let initialState = {
    userData: []
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
            return {...state, userData: [...state.userData, ...action.userData]}
        } 
        
        default: break;  
    }
    return state;
}

export const followAC = (id) => {
    return {
        type: 'FOLLOW',
        id
    }
}

export const unfollowAC = (id) => {
    return {
        type: 'UNFOLLOW',
        id
    }
}

export const setUserDataAC = (userData) => {
    return {
        type: 'SET_USERS',
        userData
    }
}

export default userReducer;