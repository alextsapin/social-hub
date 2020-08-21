import {appStateType} from '../store';

export const chatDataSelector = (state: appStateType) => {
    return state.chat.data;
}

export const newMessageSelector = (state: appStateType) => {
    return state.chat.newMessage;
}