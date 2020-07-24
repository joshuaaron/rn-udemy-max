import { createStore, combineReducers } from 'redux';
import { productsReducer } from './reducers/products';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from './reducers/cart';
import { ordersReducer } from './reducers/orders';

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer
});

export const store = createStore(rootReducer, composeWithDevTools);