import { PRODUCTS } from '../../data';
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from '../actions/products';
import { Product } from '../../models/product';
const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
};

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PRODUCT: {
            const { title, description, imageUrl, price, id } = action.payload; 
            const newProduct = new Product(id, 'u1', title, imageUrl, description, price);

            return {
                ...state,
                availableProducts: [...state.availableProducts, newProduct],
                userProducts: [...state.userProducts, newProduct]
            }
        }
        case UPDATE_PRODUCT: {
            const { id, data: { title, description, imageUrl } } = action.payload;
            const userProdIndex = state.userProducts.findIndex(prod => prod.id === id);
            const availableProdIndex = state.availableProducts.findIndex(prod => prod.id === id);
            const updatedProduct = new Product(id, state.userProducts[userProdIndex].ownerId, title, imageUrl, description, state.userProducts[userProdIndex].price);

           const updatedUserProducts = [...state.userProducts];
           updatedUserProducts[userProdIndex] = updatedProduct;

           const updatedAvailableProducts = [...state.availableProducts];
           updatedAvailableProducts[availableProdIndex] = updatedProduct;

           return {
               ...state,
               availableProducts: updatedAvailableProducts,
               userProducts: updatedUserProducts
           }
        }
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
