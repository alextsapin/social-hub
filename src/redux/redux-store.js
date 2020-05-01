import {combineReducers, createStore, applyMiddleware} from 'redux';
import PROFILE_REDUCER from './profile-reducer.js';
import CHAT_REDUCER from './chat-reducer.js';
import PEOPLE_REDUCER from './people-reducer.js';
import authReducer from './auth-reducer.js';
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({
    profile : PROFILE_REDUCER,
    chat    : CHAT_REDUCER,
    people  : PEOPLE_REDUCER,
    auth    : authReducer
});

// Создадим store c помощью redux
let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;