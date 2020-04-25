// Первичный state
let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_USER_DATA':
        return {
            ...state,
            ...action.data,
            isAuth: true
        }
    }
    return state;
}

export default authReducer;

export const setAuthUserData = (userId, email, login) => ({
    type: 'SET_USER_DATA',
    data: {userId, email, login}
})