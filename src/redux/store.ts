// Redux
import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

// Reducers
import profileReducer from './reducers/profile';
import chatReducer from './reducers/chat';
import peopleReducer from './reducers/people';
import authReducer from './reducers/auth';
import appReducer from './reducers/app';

// Объединим редьюсеры
let rootReducer = combineReducers({
    profile: profileReducer,
    chat:    chatReducer,
    people:  peopleReducer,
    auth:    authReducer,
    app:     appReducer,
    form:    formReducer
});

type rootReducerType = typeof rootReducer;
export type appStateType = ReturnType<rootReducerType>;

// Создадим store c помощью redux
let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;