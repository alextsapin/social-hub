// Redux
import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

// Reducers
import profileReducer from './reducers/profile.js';
import chatReducer from './reducers/chat.js';
import peopleReducer from './reducers/people.js';
import authReducer from './reducers/auth.js';
import appReducer from './reducers/app.js';

// Объединим редьюсеры
let reducers = combineReducers({
    profile: profileReducer,
    chat:    chatReducer,
    people:  peopleReducer,
    auth:    authReducer,
    app:     appReducer,
    form:    formReducer
});

// Создадим store c помощью redux
let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;