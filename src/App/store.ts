/* eslint-disable camelcase */
import { legacy_createStore, combineReducers, applyMiddleware, AnyAction, compose } from 'redux';
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { homeReducer } from '../pages/Home/homeReducer';
import authReducer from '../pages/Login/loginReducer';
import { profileReducer } from '../pages/Profile/profile.reducer';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const rootReducer = combineReducers({
    profile: profileReducer,
    home: homeReducer,
    auth: authReducer,
});

let preloadedState;
const interState = localStorage.getItem('state');

if (interState) {
    preloadedState = JSON.parse(interState);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(thunkMiddleware)),
);

store.subscribe(() => {
    localStorage.setItem('state', JSON.stringify(store.getState()));
});

export default store;

type rootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<rootReducerType>;
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>;

// 1 — Что возвращает thunk
// 2 — Тип стейта всего приложения
// 3 — Экстра–аргументы
// 4 — Типы всех actions
export type AppThunkType<ReturnType = void> = ThunkAction<
    ReturnType,
    AppStateType,
    unknown,
    AnyAction
>;
