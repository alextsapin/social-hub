// Первичный state
let initialState = {
    CHAT_DATA: [
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
    ],
    newMessage: ''
}

const CHAT_REDUCER = (state = initialState, action) => {

    let stateCopy = {
        ...state,
        CHAT_DATA: [...state.CHAT_DATA]
    };

    switch(action.type) {
        
        case 'UPDATE_MESSAGE': 
            stateCopy.newMessage = action.message;
            return stateCopy;

        case 'SEND_MESSAGE': 
            let message = {
                id: 4, 
                name: "Kaleb",
                image: "https://i.ibb.co/6XMcpbV/kaleb.png",
                message: state.newMessage
            }

            stateCopy = {
                ...state,
                CHAT_DATA: [...state.CHAT_DATA, message],
                newMessage: ''
            };

            return stateCopy;
         
        default: break;  
    }
    return state;
}

export default CHAT_REDUCER;

export const SEND_MESSAGE_AC = () => {
    return {
        type: 'SEND_MESSAGE'
    }
}

export const UPDATE_MESSAGE_AC = (newMessage) => {
    return {
        type: 'UPDATE_MESSAGE', 
        message: newMessage
    }
}