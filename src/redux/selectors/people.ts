import {createSelector} from 'reselect';
import {AppStateType} from '../store';

const getPeople = (state: AppStateType) => {
    return state.people['data']
};

// Вернем пользователей
export const peopleSelector = createSelector(getPeople, (data) => {
    return data;
});

// Число пользователей на страницу
export const onPageUsersSelector = (state: AppStateType) => {
    return state.people['onPageUsers']
}

// Число страниц на экране (размер порции)
export const onPortionPageSelector = (state: AppStateType) => {
    return state.people['onPortionPage']
}

// Общее число пользователей
export const peopleCountSelector = (state: AppStateType) => {
    return state.people['usersTotal']
}

// Общее число страниц
export const pagesTotalSelector = (state: AppStateType) => {
    return Math.ceil(state.people['usersTotal'] / state.people['onPageUsers']);
}

export const getFilterSelector = (state: AppStateType) => {
    return state.people['filter'];
}

// Массив страниц
export const pagesArraySelector = createSelector(pagesTotalSelector, (count) => {
    let pages = [];
    for(let i = 1; i <= count; i++) {
        pages.push(i);
    }
    return pages;
});


// Текущая страница
export const currentPageSelector = (state: AppStateType) => {
    return state.people['currentPage']
}

// Проверка соединения с сервером
export const isConnectSelector = (state: AppStateType) => {
    return state.people['isConnect']
}

// Пользователи на которых подписался
export const followUsersSelector = (state: AppStateType) => {
    return state.people['followUsers']
}

// Число порций
export const portionTotalSelector = createSelector(peopleCountSelector, onPageUsersSelector, onPortionPageSelector, (count, users, size) => {
    return Math.ceil(count / users / size);
});