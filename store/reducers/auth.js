import { LOGIN, SIGN_UP, RESTORE_TOKEN, LOGOUT } from '../actions/auth';

const initialState = {
    token: null,
    userId: null,
    loading: true,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
            };
        }
        case SIGN_UP: {
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
            };
        }
        case RESTORE_TOKEN: {
            return {
                loading: false,
                token: action.payload.token,
                userId: action.payload.userId,
            };
        }
        case LOGOUT: {
            return {
                loading: false,
                token: null,
                userId: null,
            };
        }
        default: {
            return state;
        }
    }
};
