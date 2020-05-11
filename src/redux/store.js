// Redux
import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

// Reducers
import profileReducer from './reducers/profile.js';
import chatReducer from './reducers/chat.js';
import peopleReducer from './reducers/people.js';
import authReducer from './reducers/auth.js';

// Объединим редьюсеры
let reducers = combineReducers({
    profile : profileReducer,
    chat    : chatReducer,
    people  : peopleReducer,
    auth    : authReducer
});

// Создадим store c помощью redux
let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;