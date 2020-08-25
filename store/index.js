import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { productsReducer } from './reducers/products';
import { cartReducer } from './reducers/cart';
import { ordersReducer } from './reducers/orders';
import { authReducer } from './reducers/auth';

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
