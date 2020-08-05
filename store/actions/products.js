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
    return {
        type: CREATE_PRODUCT,
        payload: {
            title, desc, imageUrl, price
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