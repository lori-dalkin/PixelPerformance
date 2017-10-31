import * as actions from './action-types';
import callApi from '../utils/apiCaller';
import { getProducts } from './productView';

// -----------------------------------------------
//                MODIFY PRODUCT
//------------------------------------------------
export const modifyProduct = (body) => {
    return (dispatch, getState) => {
        if (getState().authentication && getState().authentication.token && getState().product.modifyProduct) {
            if (shouldModifyProduct(getState())) {
                dispatch(modifyProductRequest());

                return callApi(`api/products/${getState().product.dropDownsProduct.id}`, 'put', body, `Bearer ${getState().authentication.token}`).then(
                    res => {
                        dispatch(modifyProductSuccess(res));
                        dispatch(modifyProductSuccessSnackbar());
                        dispatch(getProducts());
                    },
                    error => dispatch(modifyProductFailure())
                );
            }
        }
    };
}

function shouldModifyProduct(state) {
    if (!state.product.modifyProduct.modifyingProduct) {
        return true;
    } else {
        return false;
    }
}

export const modifyProductRequest = () => { return { type: actions.MODIFY_PRODUCT_REQUEST }; }

export const modifyProductSuccess = () => { return { type: actions.MODIFY_PRODUCT_SUCCESS }; }

export const modifyProductFailure = () => { return { type: actions.MODIFY_PRODUCT_FAILURE }; }

export const modifyProductSuccessSnackbar = () => { return { type: actions.MODIFY_PRODUCT_SUCCESS_SNACKBAR }; }

// -----------------------------------------------
//                ADD PRODUCT
//------------------------------------------------
export const addProduct = (body) => {
    return (dispatch, getState) => {
        if (getState().authentication && getState().authentication.token) {
            if (shouldAddProduct(getState())) {
                dispatch(addProductRequest());

                body = {
                    ...body,
                    electronictype: body.electronicType,
                    displaysize: body.displaySize,
                    harddrive: body.hardDrive,
                    touchscreen: body.touchScreen
                };

                return callApi('api/products', 'post', body, `Bearer ${getState().authentication.token}`).then(
                    res => {
                        dispatch(addProductSuccess(res));
                        dispatch(addProductSuccessSnackbar());
                        dispatch(getProducts());
                    },
                    error => dispatch(addProductFailure())
                );
            }
        }
    };
}


function shouldAddProduct(state) {
    if (!state.product.addProduct.addingProduct) {
        return true;
    } else {
        return false;
    }
}

export const addProductRequest = () => { return { type: actions.ADD_PRODUCT_REQUEST }; }

export const addProductSuccess = (result) => { return { type: actions.ADD_PRODUCT_SUCCESS }; }

export const addProductFailure = (error) => { return { type: actions.ADD_PRODUCT_FAILURE }; }

export const addProductSuccessSnackbar = () => { return { type: actions.ADD_PRODUCT_SUCCESS_SNACKBAR }; }

// -----------------------------------------------
//                DELETE PRODUCT
//------------------------------------------------
export const deleteProduct = (product) => {
    return (dispatch, getState) => {
        if (getState().authentication && getState().authentication.token) {
            return callApi(`api/products/${product.id}`, 'delete', undefined, `Bearer ${getState().authentication.token}`).then(
                res => dispatch(getProducts()),
                error => console.log("error in deleting")
            );
        }
    };
}

// -----------------------------------------------
//             MODIFY PRODUCT INVENTORY
//------------------------------------------------
export const addToInventory = (productId) => {

    return (dispatch, getState) => {
        if (getState().authentication && getState().authentication.token) {
            return callApi(`api/inventories/product/${productId}`, 'post', undefined, `Bearer ${getState().authentication.token}`).then(
                res => console.log("added to inventory"),
                error => console.log("failed to add to inventory")
            );
        }
    }
}

export const removeFromInventory = (productId) => {

    return (dispatch, getState) => {
        if (getState().authentication && getState().authentication.token) {
            return callApi(`api/inventories/product/${productId}`, 'delete', undefined, `Bearer ${getState().authentication.token}`).then(
                res => console.log("removed from inventory"),
                error => console.log("failed to remove from inventory")
            );
        }
    }
}