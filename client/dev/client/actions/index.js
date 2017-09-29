import { ATTEMPT_LOGIN, ACCEPT_LOGIN, SET_PRODUCTS_FILTER, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE } from './action-types';
import callApi from '../utils/apiCaller';

export const attemptLogin = (credentials) => {
	console.log("attempting login");
	return (dispatch) => {
    return callApi('api/users/logon', 'post', {
      username: credentials.username,
      password: credentials.password,
    }).then(res => dispatch(receiveAttemptLogin(res)));
  };
}

export const receiveAttemptLogin = (result) => {
    console.log(result);
    return {
        type: ACCEPT_LOGIN,
        token: result.data,
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
        if (shouldGetProducts(getState())) {
            dispatch(getProductsRequest());
            
            let endPoint = 'api/products';

            if (filter) {
                endPoint = `api/products/${filter}`
            }

            return callApi(endPoint, 'get').then(
                res => dispatch(getProductsSuccess(res)),
                error => dispatch(getProductsFailure(error))
            );
        }
    };
}
