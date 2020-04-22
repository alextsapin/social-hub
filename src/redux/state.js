import profileReducer from './profile-reducer.js';
import chatReducer from './chat-reducer.js';

let store = {
    _state : {
        profile: {
            postData: [
                {id:1, text:"В Китае успешно проверили российские тест-системы на коронавирус."},
                {id:2, text:"Разработана система борьбы с астеройдами."},
                {id:3, text:"В Монголии нашли нефть."}
            ],
            newPost: ''
        },
        chat: {
            chatData: [
                {id: 1, name: "Chloe", image: "chloe", message: "Hello!"},
                {id: 2, name: "Won", image: "won", message: "bla...bla...bla..."},
                {id: 3, name: "Matt", image: "matt", message:"Yo! Yo! Yo!"}
            ],
            newMessage: ''
        }
    },

    getState() {
        return this._state;
    },
    
    subscribe(observer) {
        return this.updateTree = observer;
    }, 

    dispatch(action) {
        this._state.profile = profileReducer(this._state.profile, action);
        this._state.chat = chatReducer(this._state.chat, action);
        // Обновим дерево
        this.updateTree();
    }
} // End store

export default store;