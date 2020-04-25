import {combineReducers, createStore} from "redux";
import profileReducer from './profile-reducer.js';
import chatReducer from './chat-reducer.js';
import peopleReducer from './people-reducer.js';
import authReducer from './auth-reducer.js';

let reducers = combineReducers({
    profile: profileReducer,
    chat: chatReducer,
    people: peopleReducer,
    auth: authReducer
});

// Создадим store c помощью redux
let store = createStore(reducers);

export default store;