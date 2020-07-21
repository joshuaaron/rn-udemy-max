import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
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
        case REMOVE_FROM_CART:
            const productId = action.payload;
            const item = state.items[productId];
            const currentQuantity = item.quantity;

            if (currentQuantity > 1) {
                return {
                    ...state,
                    totalAmount: state.totalAmount - item.price,
                    items: {
                        ...state.items,
                        [productId]: { ...item, quantity: item.quantity - 1 }
                    },
                };
            }

            const updatedItems = { ...state.items };
            delete updatedItems[productId];

            return { 
                ...state,
                items: updatedItems, 
                totalAmount: state.totalAmount - item.price
            }; 
        default:
            return state;
    }
};
