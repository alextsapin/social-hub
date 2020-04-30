import {combineReducers, createStore} from "redux";
import profileReducer from './profile-reducer.js';
import chatReducer from './chat-reducer.js';
import PEOPLE_REDUCER from './people-reducer.js';
import authReducer from './auth-reducer.js';

let reducers = combineReducers({
    profile : profileReducer,
    chat    : chatReducer,
    people  : PEOPLE_REDUCER,
    auth    : authReducer
});

// Создадим store c помощью redux
let store = createStore(reducers);

export default store;