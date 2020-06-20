import {reset} from 'redux-form';
import {getProfileAPI} from '../../api/api.js';

// Первичный state
let initialState = {
    userName: null,
    userImage: null,
    data: [
        {   id: 1, 
            name: "Chloe", 
            image: "https://i.ibb.co/0qwWMJT/chloe.jpg", 
            message: "Advertisements want to persuade us to buy particular products. How do they do it?"
        },
        { 
            id: 2, 
            name: "Won", 
            image: "https://i.ibb.co/DRcDZ2p/won.jpg", 
            message: "저는 한국어를 배웁니다 커피를 마십니다 공원에 자주 가요 영화를 봅니다"
        },
        {   id: 3, 
            name: "Matt", 
            image: "https://i.ibb.co/7kdCfVh/matt.jpg", 
            message:"Mi perro se llama Tom. Tiene 3 años y es mi mejor amigo."
        }
    ],
    newMessage: ''
}

const chatReducer = (state = initialState, action) => {

    let stateCopy = {
        ...state,
        data: [...state.data]
    };

    switch(action.type) {
        
        case 'SEND_MESSAGE': {
            let message = {
                id: stateCopy.data.length + 1, 
                name: stateCopy.userName,
                image: stateCopy.userImage,
                message: action.message
            }

            stateCopy = {
                ...state,
                data: [...state.data, message],
                newMessage: ''
            };
            
            return stateCopy;
        }

        case 'SET_USER_DATA': {
            return {...state, userName: action.name, userImage: action.image};
        }

        default: break;  
    }

    return state;
}

export default chatReducer;

const sendMessageAC = (message, name, image) => {
    return {
        type:    'SEND_MESSAGE',
        message: message,
        name:    name,
        image:   image
    }
}

const setUserDataAC = (name, image) => {
    return {
        type:    'SET_USER_DATA',
        name:    name,
        image:   image
    }
}

// Thunk creators
export const sendMessageTK = (id = 7020, message, name, image) => {
    return (dispatch) => {
        // Получим данные пользователя
        getProfileAPI(id).then(data => {
            dispatch(setUserDataAC(data.fullName, data.photos.small));
            // Уберем пробелы и проверим, что сообщение не пустое
            if(message.replace(/\s+/g,'') !== '') {
                dispatch(sendMessageAC(message));
                dispatch(reset('Chat'));
            }
        });
    }
}