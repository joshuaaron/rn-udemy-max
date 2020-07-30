import { PRODUCTS } from '../../data';
import { DELETE_PRODUCT } from '../actions/products';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
};

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(item => item.id !== action.payload),
                availableProducts: state.availableProducts.filter(item => item.id !== action.payload)
            };
        default:
            return state;
    }
}

// 5EC4FF
// 008B94