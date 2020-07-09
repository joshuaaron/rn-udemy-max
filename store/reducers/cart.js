import { ADD_TO_CART } from "../actions/cart";
import { CartItem } from "../../models/cart-item";

const initialState = {
    items: {},
    totalAmount: 0,
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const { price, title, id } = action.payload;
            let updatedCartItem;

            if (state.items[id]) {
                updatedCartItem = new CartItem(
                    state.items[id].quantity + 1,
                    price,
                    title,
                    state.items[id].sum + price
                );
            }
            else {
                updatedCartItem = new CartItem(1, price, title, price);
            }
            return {
                ...state,
                items: { ...state.items, [id]: updatedCartItem },
                totalAmount: state.totalAmount + price,
            }
        default:
            return state;
    }
};
