import { As, AsyncStorage } from 'react-native';

export const SIGN_UP = 'SIGN_UP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const RESTORE_TOKEN = 'RESTORE_TOKEN';

let timeoutId = null;

export const signUp = (email, password) => {
    return async (dispatch) => {
        try {
            const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDSylm9Pac11pSXvqPVpDiZN6xVketuHRY`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        returnSecureToken: true,
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                const { message } = errorData.error;

                let errorText = 'Something went wrong';
                if (message === 'EMAIL_EXISTS') {
                    errorText = 'This email already exists.';
                }
                throw new Error(errorText);
            }

            const data = await response.json();
            dispatch(setLogoutTimer(parseInt(data.expiresIn * 1000, 10)));
            dispatch({
                type: SIGN_UP,
                payload: {
                    token: data.idToken,
                    userId: data.localId,
                },
            });
            // convert back from huge ms number to date time object
            const expireDate = new Date(new Date().getTime() + parseInt(data.expiresIn * 1000, 10));
            saveDataToStorage(data.idToken, data.localId, expireDate);
        } catch (err) {
            throw new Error(err.message);
        }
    };
};

export const login = (email, password) => {
    return async (dispatch) => {
        try {
            const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSylm9Pac11pSXvqPVpDiZN6xVketuHRY`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        returnSecureToken: true,
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                const { message } = errorData.error;

                let errorText = 'Something went wrong';
                if (message === 'INVALID_EMAIL') {
                    errorText = 'This email could not be found.';
                } else if (message === 'INVALID_PASSWORD') {
                    errorText = 'Your password is incorrect. Please try again.';
                }
                throw new Error(errorText);
            }

            const data = await response.json();
            dispatch(setLogoutTimer(parseInt(data.expiresIn * 1000, 10)));
            dispatch({
                type: LOGIN,
                payload: {
                    token: data.idToken,
                    userId: data.localId,
                },
            });
            // convert back from huge ms number to date time object
            const expireDate = new Date(new Date().getTime() + parseInt(data.expiresIn * 1000, 10));
            saveDataToStorage(data.idToken, data.localId, expireDate);
        } catch (err) {
            throw new Error(err.message);
        }
    };
};

export const logout = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    return { type: LOGOUT };
};

const setLogoutTimer = (expirationTime) => {
    return (dispatch) => {
        timeoutId = setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};

const clearLogoutTimer = () => {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
};

export const saveDataToStorage = async (token, userId, expiryDate) => {
    await AsyncStorage.setItem(
        'userData',
        JSON.stringify({ token, userId, expiryDate: expiryDate.toISOString() })
    );
};
