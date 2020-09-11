import { Product } from '../../models/product';

export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const deleteProduct = (productId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(
            `https://rn-course-max.firebaseio.com/products/${productId}.json?auth=${token}`,
            {
                method: 'DELETE',
            }
        );

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        dispatch({
            type: DELETE_PRODUCT,
            payload: productId,
        });
    };
};

export const createProduct = (title, description, imageUrl, price) => {
    return async (dispatch, getState) => {
        const { token, userId } = getState().auth;
        const newProductData = { title, description, imageUrl, price, ownerId: userId };

        try {
            const response = await fetch(
                `https://rn-course-max.firebaseio.com/products.json?auth=${token}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newProductData),
                }
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();

            dispatch({
                type: CREATE_PRODUCT,
                payload: {
                    id: data.name,
                    title,
                    description,
                    imageUrl,
                    price,
                    ownerId: userId,
                },
            });
        } catch (err) {
            console.log(err.message);
        }
    };
};

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        const { userId } = getState().auth;

        try {
            const response = await fetch('https://rn-course-max.firebaseio.com/products.json');
            const data = await response.json();

            const loadedProducts = [];
            for (const key in data) {
                loadedProducts.push(
                    new Product(
                        key,
                        data[key].ownerId,
                        data[key].title,
                        data[key].imageUrl,
                        data[key].description,
                        data[key].price
                    )
                );
            }
            dispatch({
                type: SET_PRODUCTS,
                payload: {
                    loadedProducts,
                    userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
                },
            });
        } catch (err) {
            console.log(err.message);
        }
    };
};

export const updateProduct = (id, title, description, imageUrl) => {
    const updatedData = { title, description, imageUrl };

    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(
            `https://rn-course-max.firebaseio.com/products/${id}.json?auth=${token}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            }
        );

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        dispatch({
            type: UPDATE_PRODUCT,
            payload: {
                id,
                data: { title, description, imageUrl },
            },
        });
    };
};
