import { ADD_ORDER } from "../actions/orders";
import { Order } from "../../models/orders";

const initialState = {
    orders: []
};

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const newOrder = new Order(
                new Date().toString(),
                action.payload.items,
                action.payload.amount,
                new Date()
            );

            return {
                ...state,
                orders: [...state.orders, newOrder]
            };
        default:
            return state;
    }
}