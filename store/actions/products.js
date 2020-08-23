export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const deleteProduct = productId => {
    return {
        type: DELETE_PRODUCT,
        payload: productId
    }
}

export const createProduct = (title, desc, imageUrl, price) => {
    const results = { title, desc, imageUrl, price };

    return async (dispatch) => {
        try {
            const response = await fetch('https://rn-course-max.firebaseio.com/products.json', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(results)
            });
            const data = await response.json();

            dispatch({
                type: CREATE_PRODUCT,
                payload: {
                    id: data.name, title, desc, imageUrl, price
                }
            });
        } catch (err) {
            console.log(err.message)
        }
    }
}

export const updateProduct = (id, title, desc, imageUrl) => {
    return {
        type: UPDATE_PRODUCT,
        payload: {
            id,
            data: { title, desc, imageUrl }
        }
    }
}