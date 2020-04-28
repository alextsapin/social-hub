// Первичный state
let initialState = {
    chatData: [
        {id: 1, name: "Chloe", image: "chloe", message: "Advertisements want to persuade us to buy particular products. How do they do it?"},
        {id: 2, name: "Won", image: "won", message: "저는 한국어를 배웁니다 커피를 마십니다 공원에 자주 가요 영화를 봅니다"},
        {id: 3, name: "Matt", image: "matt", message:"Mi perro se llama Tom. Tiene 3 años y es mi mejor amigo."}
    ],
    newMessage: ''
}

const chatReducer = (state = initialState, action) => {

    let stateCopy = {
        ...state,
        chatData: [...state.chatData]
    };

    switch(action.type) {
        case 'UPDATE_MESSAGE': 
            stateCopy.newMessage = action.message;
            return stateCopy;

        case 'SEND_MESSAGE': 
            let message = {
                id: 4, 
                name: "Kaleb",
                image: "kaleb",
                message: state.newMessage
            }

            stateCopy = {
                ...state,
                chatData: [...state.chatData, message],
                newMessage: ''
            };

            return stateCopy;
         
        default: break;  
    }
    return state;
}

export default chatReducer;

export const sendMessage = () => {
    return {
        type: 'SEND_MESSAGE'
    }
}

export const updateMessage = (newMessage) => {
    return {
        type: 'UPDATE_MESSAGE', 
        message: newMessage
    }
}