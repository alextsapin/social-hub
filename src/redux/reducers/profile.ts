import {stopSubmit} from 'redux-form';
import {getProfileAPI, getStatusAPI, updateStatusAPI, setAvatarAPI, saveProfileAPI} from '../../api/api';
import {Dispatch} from 'redux';

type InitialStateDataType = {
    id: number
    text: string
}

type InitialStateType = {
    data: Array<InitialStateDataType>,
    post: string,
    person: null
    status: string
}

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

const profileReducer = (state = initialState, action: GeneralACType): InitialStateType => {
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

type AddPostACType = {
    type: string
}

export const addPostAC = (): AddPostACType => {
    return {
        type: 'ADD_POST'
    }
}

type UpdatePostACType = {
    type: string
    post: string
}

export const updatePostAC = (newPost: string): UpdatePostACType => {
    return {
        type: 'UPDATE_POST', 
        post: newPost
    }
}

type DelPostACType = {
    type: string
    id: number
}

export const delPostAC = (id: number): DelPostACType => {
    return {
        type: 'DELETE_POST', 
        id: id
    }
}

type SetProfileACType = {
    type: string
    person: any
}

export const setProfileAC = (person: any): SetProfileACType => {
    return {
        type: 'SET_USER_PROFILE', 
        person
    }
}

type SetStatusACType = {
    type: string
    status: string
}

export const setStatusAC = (status: string): SetStatusACType => {
    return {
        type: 'SET_STATUS', 
        status
    }
}

type SetAvatarACType = {
    type: string
    file: File
}

export const setAvatarAC = (file: any): SetAvatarACType => {
    return {
        type: 'SET_AVATAR', 
        file
    }
}

type GeneralACType = AddPostACType & UpdatePostACType & DelPostACType & SetProfileACType & SetStatusACType & SetAvatarACType;

// Thunk creators
export const setAvatarTC = (file: any) => {
    return (dispatch: Dispatch) => {
        setAvatarAPI(file).then(data => {
            dispatch(setAvatarAC(data));
        });
    }
}

export const getProfileTC = (id: number) => {
    return (dispatch: Dispatch) => {
        // Получим данные пользователя
        getProfileAPI(id).then(data => {
            dispatch(setProfileAC(data));
        });
    }
}

export const addPostTC = (message: string) => {
    return (dispatch: Dispatch) => {
        // Уберем пробелы и проверим, что сообщение не пустое
        if(message.replace(/\s+/g,'') !== '') {
            dispatch(addPostAC());
        } else {
            dispatch(updatePostAC(''));
        }
    }
}

export const updatePostTC = (message: string) => {
    return (dispatch: Dispatch) => {
        dispatch(updatePostAC(message));
    }
}

export const getStatusTC = (id: number) => {
    return (dispatch: Dispatch) => {
        getStatusAPI(id).then(data => {
            dispatch(setStatusAC(data));
        });
    }
}

export const updateStatusTC = (status: string) => {
    return (dispatch: Dispatch) => {
        updateStatusAPI(status).then(data => {
            if(data.resultCode === 0) {
                dispatch(setStatusAC(status));
            }
        });
    }
}

export const saveProfileTC = (id: number, data: any) => {
    return async (dispatch: any) => {
        let response = await saveProfileAPI(data);            
        if(response.resultCode === 0) {
            dispatch(getProfileTC(id));
        } else {
            dispatch(stopSubmit('profile', {_error: response.messages[0]}));
            return Promise.reject(response.messages[0]);
        }
    }
}