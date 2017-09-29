import { ACCEPT_LOGIN, SET_TOKEN, DELETE_TOKEN, REJECT_LOGIN, ATTEMPT_LOGIN, HIDE_SNACKBAR, SHOW_SNACKBAR, SET_PRODUCTS_FILTER, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE } from './action-types';
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
        type: ATTEMPT_LOGIN,
    };
}

export const receiveAttemptLogin = (result) => {
    if (result.data !== undefined) {
        return {
            type: ACCEPT_LOGIN,
            token: result.data,
        };
    } else {
        return {
            type: REJECT_LOGIN
        };
    }
}

export const setToken = (token) => {
    return {
        type: SET_TOKEN,
        token: token
    };
}

export const deleteToken = () => {
    return {
        type: DELETE_TOKEN
    };
}

export const setProductFilter = (filter) => {
    return {
        type: SET_PRODUCTS_FILTER,
        productFilter: filter
    }
}

export const getProductsRequest = () => {
    return {
        type: GET_PRODUCTS_REQUEST
    };
}

export const getProductsSuccess = (products) => {
    return {
        type: GET_PRODUCTS_SUCCESS,
        products: products
    };
}

export const getProductsFailure = (error) => {
    return {
        type: GET_PRODUCTS_FAILURE,
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
        }
    };
}
export const showSnackbar = () => {
    return { type: SHOW_SNACKBAR };
}

export const hideSnackbar = () => {
    return { type: HIDE_SNACKBAR };
}