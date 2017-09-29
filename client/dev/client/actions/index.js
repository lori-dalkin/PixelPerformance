import { ATTEMPT_LOGIN, SET_PRODUCTS_FILTER, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE } from './action-types';

export const attemptLogin = (credentials) => {
	console.log("attempting login");
	return {
		type: ATTEMPT_LOGIN,
		payload: credentials
	}
};

export const setProductFilter = (filter) => {
    return {
        type: SET_PRODUCT_FILTERS,
        productFilter: filter
    }
};

export const getProductsRequest = () => {
    return {
        type: GET_PRODUCTS_REQUEST
    };
};

export const getProductsSuccess = (products) => {
    return {
        type: GET_PRODUCTS_SUCCESS,
        products: products
    };
};

export const getProductsFailure = (error) => {
    return {
        type: GET_PRODUCTS_FAILURE,
        error: error
    };
};

function shouldGetProducts(state) {
    const products = state.product.products;


    if (!products || !state.product.isFetching) {
        return true;
    } else {
        return false;
    }
}

export const getProducts = () => {
    return function (dispatch, getState) {
        dispatch(requestProducts());

        if (shouldGetProducts(getState())) {

        }
    };
};