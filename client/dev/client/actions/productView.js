import * as actions from './action-types';
import callApi from '../utils/apiCaller';

// -----------------------------------------------
//               PRODUCT VIEW
//------------------------------------------------
export const setProductFilter = (filters) => {
    return {
        type: actions.SET_PRODUCTS_FILTER,
        filters: filters
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

export const setNumProducts = (number) => {
    return {
        type: actions.SET_NUM_PRODUCTS,
        numProducts: number
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

                let endPoint = 'api/products';

                // Add paging and number of items
                endPoint += `?page=${getState().product.page}&numOfItems=${getState().product.productsPerPage}`;

                // Add filter
                if (getState().product.filterSet){
                    if (getState().product.filters.electronicType) {
                        endPoint += `&type=${getState().product.filters.electronicType}`;
                    }
                    if(getState().product.filters.brand){
                        endPoint += `&brand=${getState().product.filters.brand}`;
                    }
                    if(getState().product.filters.priceLow){
                        endPoint += `&priceLow=${getState().product.filters.priceLow}`;
                    }
                    if(getState().product.filters.priceHigh){
                        endPoint += `&priceHigh=${getState().product.filters.priceHigh}`;
                    }
                    if(getState().product.filters.maxSize){
                        endPoint += `&maxSize=${getState().product.filters.maxSize}`;
                    }
                    if(getState().product.filters.maxWeight){
                        endPoint += `&maxWeight=${getState().product.filters.maxWeight}`;
                    }
                }

                return callApi(endPoint, 'get', undefined, `Bearer ${getState().authentication.token}`).then(
                    res => {
                        dispatch(setNumProducts(res.totalProducts));
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
export const setPage = (number) => {
    return {
        type: actions.SET_PRODUCT_PAGE,
        pageNumber: number
    };
}

export const showSpecificProductPage = (number) => {
    return function (dispatch) {
        dispatch(setPage(number));
        dispatch(getProducts());
    };
}

export const setRowsAmount = (number) => {
    return {
        type: actions.SET_ROWS_PER_PAGE,
        rowsPerPage: number
    };
}

export const setRowsPerPage = (number) => {
    return function (dispatch) {
        dispatch(setRowsAmount(number));
        dispatch(getProducts());
    };
}