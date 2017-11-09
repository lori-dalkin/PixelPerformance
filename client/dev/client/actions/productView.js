import * as actions from './action-types';
import callApi from '../utils/apiCaller';

// -----------------------------------------------
//               PRODUCT VIEW
//------------------------------------------------
export const setProductFilter = (filter) => {
    return {
        type: actions.SET_PRODUCTS_FILTER,
        productFilter: filter
    }
}

export const getProductsRequest = () => { return { type: actions.GET_PRODUCTS_REQUEST }; }

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

export const getProducts = () => {
    return function (dispatch, getState) {
        if (getState().authentication && getState().authentication.token) {
            if (shouldGetProducts(getState())) {
                dispatch(getProductsRequest());

                let queryStarted = false;

                let endPoint = 'api/products';

                if (getState().product.productFilter) {
                    endPoint = `api/products?type=${getState().product.productFilter}`
                    queryStarted = true;
                }

                // Add paging and number of items
                if (queryStarted) {
                    endPoint += '&';
                } else {
                    endPoint += '?';
                }
                endPoint += `page=${getState().product.page}&numOfItems=${getState().product.productsPerPage}`;

                return callApi(endPoint, 'get', undefined, `Bearer ${getState().authentication.token}`).then(
                    res => {
                        dispatch(setMaxPage(res.totalProducts));
                        dispatch(getProductsSuccess(res.products));
                    },
                    error => dispatch(getProductsFailure(error))
                );
            }
        }
    };
}

// -----------------------------------------------
//               PAGINATION
//------------------------------------------------
export const setMaxPage = (numProducts) => {
    return {
        type: actions.SET_MAX_PRODUCT_PAGE,
        numProducts: numProducts
    };
}

export const setPage = (number) => {
    return {
        type: actions.SET_PRODUCT_PAGE,
        pageNumber: number
    };
}

export const incrementPage = () => { return { type: actions.INCREMENT_PRODUCT_PAGE }; }

export const decrementPage = () => { return { type: actions.DECREMENT_PRODUCT_PAGE }; }

export const showNextProductPage = () => {
    return function (dispatch) {
        dispatch(incrementPage());
        dispatch(getProducts());
    }
}

export const showPreviousProductPage = () => {
    return function (dispatch) {
        dispatch(decrementPage());
        dispatch(getProducts());
    }
}

export const showSpecificProductPage = (number) => {
    return function (dispatch) {
        dispatch(setPage(number));
        dispatch(getProducts());
    }
}