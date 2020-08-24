import { ADD_ORDER, SET_ORDERS } from '../actions/orders';
import { Order } from '../../models/orders';

const initialState = {
    orders: [],
};

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDERS: {
            return {
                ...state,
                orders: action.payload,
            };
        }
        case ADD_ORDER:
            const newOrder = new Order(
                action.payload.id,
                action.payload.items,
                action.payload.amount,
                action.payload.date
            );

            return {
                ...state,
                orders: [...state.orders, newOrder],
            };
        default:
            return state;
    }
};
