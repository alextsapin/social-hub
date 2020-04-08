// Первичный state
let initialState = {
    chatData: [
        {id: 1, name: "Chloe", image: "chloe", message: "Hello!"},
        {id: 2, name: "Won", image: "won", message: "bla...bla...bla..."},
        {id: 3, name: "Matt", image: "matt", message:"Yo! Yo! Yo!"}
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