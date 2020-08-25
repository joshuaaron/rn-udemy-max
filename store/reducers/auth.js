import { LOGIN, SIGN_UP } from '../actions/auth';

const initialState = {
    token: null,
    userId: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                token: action.payload.token,
                userId: action.payload.userId,
            };
        }
        case SIGN_UP: {
            return {
                token: action.payload.token,
                userId: action.payload.userId,
            };
        }
        default: {
            return state;
        }
    }
};
