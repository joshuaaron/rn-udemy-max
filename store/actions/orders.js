import { Order } from '../../models/orders';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const addOrder = (cartItems, totalAmount) => {
    const date = new Date().toISOString();

    return async (dispatch, getState) => {
        const token = getState().auth.token;
        try {
            const response = await fetch(
                `https://rn-course-max.firebaseio.com/orders/u1.json?auth=${token}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        cartItems,
                        totalAmount,
                        date,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();

            dispatch({
                type: ADD_ORDER,
                payload: {
                    id: data.name,
                    items: cartItems,
                    amount: totalAmount,
                    date,
                },
            });
        } catch (err) {
            console.log(err.message);
        }
    };
};

export function fetchOrders() {
    return async (dispatch) => {
        try {
            const response = await fetch('https://rn-course-max.firebaseio.com/orders/u1.json');
            const data = await response.json();

            const loadedOrders = [];

            for (const key in data) {
                loadedOrders.push(
                    new Order(
                        key,
                        data[key].cartIems,
                        data[key].totalAmount,
                        new Date(data[key].date)
                    )
                );
            }
            dispatch({
                type: SET_ORDERS,
                payload: loadedOrders,
            });
        } catch (err) {
            console.log(err.message);
        }
    };
}
