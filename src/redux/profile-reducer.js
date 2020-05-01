// Первичный state
let initialState = {
    postData: [
        {id:1, text:"В Китае успешно проверили российские тест-системы на коронавирус."},
        {id:2, text:"Разработана система борьбы с астеройдами."},
        {id:3, text:"В Монголии нашли нефть."}
    ],
    newPost: '',
    profile: null
}

const PROFILE_REDUCER = (state = initialState, action) => {

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

        case 'SET_USER_PROFILE': 
            return {...state, profile: action.profile}
        
        default: break;  
    }
    return state;
}

export default PROFILE_REDUCER;

export const ADD_POST_AC = () => {
    return {
        type: 'ADD_POST'
    }
}

export const UPDATE_POST_AC = (newPost) => {
    return {
        type: 'UPDATE_POST', 
        post: newPost
    }
}

export const SET_USER_PROFILE_AC = (profile) => {
    return {
        type: 'SET_USER_PROFILE', 
        profile
    }
}