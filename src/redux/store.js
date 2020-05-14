// Redux
import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

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
    auth    : authReducer,
    form    : formReducer
});

// Создадим store c помощью redux
let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;