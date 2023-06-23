import {AppStateType} from '../store';

export const chatDataSelector = (state: AppStateType) => {
    return state.chat.data;
}

export const newMessageSelector = (state: AppStateType) => {
    return state.chat.newMessage;
}