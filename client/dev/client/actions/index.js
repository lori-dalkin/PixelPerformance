import * as actions from './action-types';
import callApi from '../utils/apiCaller';

export const attemptLogin = (credentials) => {
	return (dispatch) => {
        dispatch(showLoading());
        return callApi('api/users/login', 'post', {
            email: credentials.email,
            password: credentials.password,
        }).then(
            res => dispatch(receiveAttemptLogin(res)),
            error => dispatch(receiveAttemptLogin({ data: undefined }))
        );
    };
}

export const showLoading = () => {
    return {
        type: actions.ATTEMPT_LOGIN,
    };
}

export const receiveAttemptLogin = (result) => {
    if (result.data !== undefined) {
        return {
            type: actions.ACCEPT_LOGIN,
            token: result.data,
        };
    } else {
        return {
            type: actions.REJECT_LOGIN
        };
    }
}

export const setToken = (token) => {
    return {
        type: actions.SET_TOKEN,
        token: token
    };
}

export const deleteToken = () => {
    return {
        type: actions.DELETE_TOKEN
    };
}

export const setProductFilter = (filter) => {
    return {
        type: actions.SET_PRODUCTS_FILTER,
        productFilter: filter
    }
}

export const getProductsRequest = () => {
    return {
        type: actions.GET_PRODUCTS_REQUEST
    };
}

export const getProductsSuccess = (products) => {
    return {
        type: actions.GET_PRODUCTS_SUCCESS,
        products: products
    };
}

export const getProductsFailure = (error) => {
    return {
        type: actions.GET_PRODUCTS_FAILURE,
        error: error
    };
}

function shouldGetProducts(state) {
    const products = state.product.products;

    if (!products || !state.product.isFetching) {
        return true;
    } else {
        return false;
    }
}

export const getProducts = (filter = "") => {
    return function (dispatch, getState) {
        if (getState().authentication && getState().authentication.token) {
            if (shouldGetProducts(getState())) {
                dispatch(getProductsRequest());
                
                let endPoint = 'api/products/';

                if (filter) {
                    endPoint = `api/products/${filter}`
                }

                return callApi(endPoint, 'get', undefined, `Bearer ${getState().authentication.token}`).then(
                    res => dispatch(getProductsSuccess(res.data)),
                    error => dispatch(getProductsFailure(error))
                );
            }
        } else {

        }
    };
}
export const showSnackbar = () => {
    return { type: actions.SHOW_SNACKBAR };
}
export const hideSnackbar = () => {
    return { type: actions.HIDE_SNACKBAR };
}

export const addProductRequest = () => {
    return {
        type: actions.ADD_PRODUCT_REQUEST
    };
}

export const showProductView = (product) => {
    return { type: actions.SHOW_PRODUCT_VIEW_DIALOG, product };
}

export const addProductSuccess = (result) => {
    return {
        type: actions.ADD_PRODUCT_SUCCESS,
        product: result.data
    };
}

export const addProductFailure = (error) => {
    return {
        type: actions.ADD_PRODUCT_FAILURE
    };
}

function shouldAddProduct(state) {
    if (!state.product.addProduct.addingProduct) {
        return true;
    } else {
        return false;
    }
}

export const addProduct = (body) => {
  return (dispatch, getState) => {
    if (getState().authentication && getState().authentication.token) {
        if (shouldAddProduct(getState())) {
            dispatch(addProductRequest());

            return callApi('api/products', 'post', body, `Bearer ${getState().authentication.token}`).then(
                res => dispatch(addProductSuccess(res)),
                error => dispatch(addProductFailure())
            );
        }
    }
  };
}

export const deleteProduct = (product) => {
  return (dispatch, getState) => {
    if (getState().authentication && getState().authentication.token) {
      return callApi('api/products/' + product.id, 'delete', '', `Bearer ${getState().authentication.token}`).then(
          res => dispatch(getProductsRequest()),
          error => console.log("error in deleting")
      );
    }
  };
}

export const hideProductView = () => {
    return { type: actions.HIDE_PRODUCT_VIEW_DIALOG };
}

export const showAddProduct = () => {
    return { type: actions.SHOW_ADD_PRODUCT_DIALOG };
}

export const hideAddProduct = () => {
    return { type: actions.HIDE_ADD_PRODUCT_DIALOG };
}

export const showDeleteProduct = (product) => {
    return { type: actions.SHOW_DELETE_PRODUCT_DIALOG, product };
}

export const hideDeleteProduct = () => {
    return { type: actions.HIDE_DELETE_PRODUCT_DIALOG };
}