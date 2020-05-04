// DAL
import {getProfileAPI} from '../api/api.js';

// Первичный state
let initialState = {
    data: [
        {id:1, text:"В Китае успешно проверили российские тест-системы на коронавирус."},
        {id:2, text:"Разработана система борьбы с астеройдами."},
        {id:3, text:"В Монголии нашли нефть."}
    ],
    newPost: '',
    profile: null
}

const profileReducer = (state = initialState, action) => {

    let stateCopy = {
        ...state,
        data: [...state.data]
    };

    switch(action.type) {
        case 'ADD_POST': 
            let post = {
                id: 4, 
                text: state.newPost
            }

            stateCopy = {
                ...state,
                data: [...state.data, post],
                newPost: ''
            };

            return stateCopy;
         
        case 'UPDATE_POST': 
            stateCopy.newPost = action.post;
            return stateCopy; 

        case 'SET_USER_PROFILE': 
            return {...state, profile: action.profile}
        
        default: break;  
    }
    return state;
}

export default profileReducer;

export const addPostAC = () => {
    return {
        type: 'ADD_POST'
    }
}

export const updatePostAC = (newPost) => {
    return {
        type: 'UPDATE_POST', 
        post: newPost
    }
}

export const setProfileAC = (profile) => {
    return {
        type: 'SET_USER_PROFILE', 
        profile
    }
}

// Thunk creators
export const getProfileTC = (id) => {
    return (dispatch) => {
        // Получим данные пользователя
        getProfileAPI(id).then(data => {
            dispatch(setProfileAC(data));
        });
    }
}

export const addPostTC = (message) => {
    return (dispatch) => {
        // Уберем пробелы и проверим, что сообщение не пустое
        if(message.replace(/\s+/g,'') != '') {
            dispatch(addPostAC());
        } else {
            dispatch(updatePostAC(''));
        }
    }
}

export const updatePostTC = (message) => {
    return (dispatch) => {
        dispatch(updatePostAC(message));
    }
}