import * as actions from './action-types';
import callApi from '../utils/apiCaller';

export const getHistoryOfProductsRequest = () => { return { type: actions.GET_HISTORY_OF_PRODUCTS_REQUEST }; }

export const getHistoryOfProductsSuccess = (products) => {
    console.log(products);
    return {
        type: actions.GET_HISTORY_OF_PRODUCTS_SUCCESS,
        products: products
    };
}

export const getHistoryOfProductsFailure = (error) => {
    return {
        type: actions.GET_HISTORY_OF_PRODUCTS_FAILURE,
        error: error
    };
}

function shouldGetHistoryOfProducts(state) {
    const products = state.history.products;

    if (!products || !state.history.isFetching) {
        return true;
    } else {
        return false;
    }
}

export const getHistoryOfProducts = () => {
    return function (dispatch, getState) {
        if (getState().authentication && getState().authentication.token) {
            if (shouldGetHistoryOfProducts(getState())) {
                dispatch(getHistoryOfProductsRequest());
                let endPoint = 'api/records';

                return callApi(endPoint, 'get', undefined, `Bearer ${getState().authentication.token}`).then(
                    res => dispatch(getHistoryOfProductsSuccess(res.products)),
                    error => dispatch(getHistoryOfProductsFailure(error))
                );
            }
        }
    };
}