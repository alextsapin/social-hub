import {combineReducers, createStore, applyMiddleware} from 'redux';
import profileReducer from './profile-reducer.js';
import chatReducer from './chat-reducer.js';
import peopleReducer from './people-reducer.js';
import authReducer from './auth-reducer.js';
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({
    profile : profileReducer,
    chat    : chatReducer,
    people  : peopleReducer,
    auth    : authReducer
});

// Создадим store c помощью redux
let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;