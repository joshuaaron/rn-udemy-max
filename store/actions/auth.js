export const SIGN_UP = 'SIGN_UP';
export const LOGIN = 'LOGIN';

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

            dispatch({
                type: SIGN_UP,
                payload: {
                    token: data.idToken,
                    userId: data.localId,
                },
            });
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
            dispatch({
                type: LOGIN,
                payload: {
                    token: data.idToken,
                    userId: data.localId,
                },
            });
        } catch (err) {
            throw new Error(err.message);
        }
    };
};
