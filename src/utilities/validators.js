// Обязательное поле
export const requiredField = (value) => {
    if(value) {
        return undefined;
    }
    else {
        return 'Field is required';
    }
}

// Максимальная длина текста
export const maxLengthCreator = (length) => (value) => {
    if(value && value.length > length ) {
        return `Max length is ${length} symbols`;
    }
    else {
        return undefined;
    }
}

// Минимальная длина текста
export const minLengthCreator = (length) => (value) => {
    if(value && value.length < length ) {
        return `Min length is ${length} symbol(s)`;
    }
    else {
        return undefined;
    }
}