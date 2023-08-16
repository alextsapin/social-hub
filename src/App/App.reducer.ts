/* eslint-disable default-param-last */
type AppStateType = {
    error: null | string;
};

const initialState: AppStateType = {
    error: null,
};

export const AppReducer = (state = initialState, action: SetErrorType): AppStateType => {
    switch (action.type) {
        case 'APP/SET_ERROR': {
            return {
                ...state,
                error: action.error,
            };
        }

        default:
            return state;
    }
};

type SetErrorType = {
    type: 'APP/SET_ERROR';
    error: null | string;
};

export const setError = (error: null | string): SetErrorType => ({
    type: 'APP/SET_ERROR' as const,
    error,
});
