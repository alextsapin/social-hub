// Первичный state
let initialState = {
    postData: [
        {id:1, text:"В Китае успешно проверили российские тест-системы на коронавирус."},
        {id:2, text:"Разработана система борьбы с астеройдами."},
        {id:3, text:"В Монголии нашли нефть."}
    ],
    newPost: ''
}

const profileReducer = (state = initialState, action) => {

    let stateCopy = {
        ...state,
        postData: [...state.postData]
    };

    switch(action.type) {
        case 'ADD_POST': 
            let post = {
                id: 4, 
                text: state.newPost
            }

            stateCopy = {
                ...state,
                postData: [...state.postData, post],
                newPost: ''
            };

            return stateCopy;
         
        case 'UPDATE_POST': 
            stateCopy.newPost = action.post;
            return stateCopy; 
        
        default: break;  
    }
    return state;
}

export default profileReducer;