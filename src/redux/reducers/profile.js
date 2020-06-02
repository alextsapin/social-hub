// DAL
import {getProfileAPI, getStatusAPI, updateStatusAPI, setAvatarAPI} from '../../api/api.js';

// Первичный state
let initialState = {
    data: [
        {id:1, text:"В Китае успешно проверили российские тест-системы на коронавирус."},
        {id:2, text:"Разработана система борьбы с астеройдами."},
        {id:3, text:"В Монголии нашли нефть."}
    ],
    post: '',
    person: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {
    let stateCopy = {
        ...state,
        data: [...state.data]
    };

    switch(action.type) {
        // Добавим пост
        case 'ADD_POST': 
            let post = {
                id: stateCopy.data.length + 1, 
                text: state.post
            }

            stateCopy = {
                ...state,
                data: [...state.data, post],
                post: ''
            };
        return stateCopy;
         
        // Обновим пост
        case 'UPDATE_POST': 
        stateCopy.post = action.post;
        return stateCopy; 

        // Удалим пост
        case 'DELETE_POST': 
        return {...state, data: state.data.filter(post => post.id !== action.id)} 

        // Установим профиль пользователя
        case 'SET_USER_PROFILE': 
        return {...state, person: action.person}
        
        // Установим статус
        case 'SET_STATUS': 
        return {...state, status: action.status}
        
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

export const delPostAC = (id) => {
    return {
        type: 'DELETE_POST', 
        id: id
    }
}

export const setProfileAC = (person) => {
    return {
        type: 'SET_USER_PROFILE', 
        person
    }
}

export const setStatusAC = (status) => {
    return {
        type: 'SET_STATUS', 
        status
    }
}

export const setAvatarAC = (file) => {
    return {
        type: 'SET_AVATAR', 
        file
    }
}

// Thunk creators
export const setAvatarTC = (file) => {
    return (dispatch) => {
        setAvatarAPI(file).then(data => {
            dispatch(setAvatarAC(data));
        });
    }
}

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
        if(message.replace(/\s+/g,'') !== '') {
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

export const getStatusTC = (id) => {
    return (dispatch) => {
        getStatusAPI(id).then(data => {
            dispatch(setStatusAC(data));
        });
    }
}

export const updateStatusTC = (status) => {
    return (dispatch) => {
        updateStatusAPI(status).then(data => {
            if(data.resultCode === 0) {
                dispatch(setStatusAC(status));
            }
        });
    }
}