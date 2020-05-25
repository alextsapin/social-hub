import {reset} from 'redux-form';

// Первичный state
let initialState = {
    data: [
        {   id: 1, 
            name: "Chloe", 
            image: "https://i.ibb.co/KxGLbPg/chloe.png", 
            message: "Advertisements want to persuade us to buy particular products. How do they do it?"
        },
        { 
            id: 2, 
            name: "Won", 
            image: "https://i.ibb.co/8XQMSVW/won.png", 
            message: "저는 한국어를 배웁니다 커피를 마십니다 공원에 자주 가요 영화를 봅니다"
        },
        {   id: 3, 
            name: "Matt", 
            image: "https://i.ibb.co/k5WprG1/matt.png", 
            message:"Mi perro se llama Tom. Tiene 3 años y es mi mejor amigo."
        }
    ]
}

const chatReducer = (state = initialState, action) => {

    let stateCopy = {
        ...state,
        data: [...state.data]
    };

    switch(action.type) {
        
        case 'SEND_MESSAGE': 
            let message = {
                id: stateCopy.data.length +1, 
                name: "Kaleb",
                image: "https://i.ibb.co/6XMcpbV/kaleb.png",
                message: action.message
            }

            stateCopy = {
                ...state,
                data: [...state.data, message],
                newMessage: ''
            };
            
            return stateCopy;
         
        default: break;  
    }
    return state;
}

export default chatReducer;

export const sendMessageAC = (message) => {
    return {
        type: 'SEND_MESSAGE',
        message: message
    }
}

// Thunk creators
export const sendMessageTK = (message) => {
    return (dispatch) => {
        // Уберем пробелы и проверим, что сообщение не пустое
        if(message.replace(/\s+/g,'') !== '') {
            dispatch(sendMessageAC(message));
            dispatch(reset('Chat'));
        }
    }
}