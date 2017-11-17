import * as actions from './action-types';
import callApi from '../utils/apiCaller';
import { fetchInventory } from './adminProductActions';

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
                        if (getState().product.filters.electronicType !== 'Type') {
                            endPoint += `&type=${getState().product.filters.electronicType}`;
                        }
                    }
                    if(getState().product.filters.brand){
                        if(getState().product.filters.brand !== 'Brand'){
                            endPoint += `&brand=${getState().product.filters.brand}`;
                        }
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

export const previousProduct = () => {
    return function (dispatch, getState) {
        if (getState().product.selectedProduct.id == getState().product.products[0].id && getState().product.page > 1) {
            dispatch(setPage(getState().product.page - 1));
            dispatch(getProducts()).then(() => {
                dispatch(setProduct(getState().product.products[getState().product.products.length - 1]));
                dispatch(fetchInventory(getState().product.products[getState().product.products.length - 1].id));
            });
        } else {
            for (let i = 0; i < getState().product.products.length; i++) {
                if (getState().product.selectedProduct.id == getState().product.products[i].id) {
                    dispatch(setProduct(getState().product.products[i - 1]));
                    dispatch(fetchInventory(getState().product.products[i - 1].id));
                    break;
                }
            }
        }
    };
}

export const nextProduct = () => {
    return function (dispatch, getState) {
        if (getState().product.selectedProduct.id == getState().product.products[getState().product.products.length - 1].id && getState().product.page < Math.floor(getState().product.numProducts / getState().product.productsPerPage) + 1) {
            dispatch(setPage(getState().product.page + 1));
            dispatch(getProducts()).then(() => {
                dispatch(setProduct(getState().product.products[0]));
                dispatch(fetchInventory(getState().product.products[0].id));
            });
        } else {
            for (let i = 0; i < getState().product.products.length; i++) {
                if (getState().product.selectedProduct.id == getState().product.products[i].id) {
                    dispatch(setProduct(getState().product.products[i + 1]));
                    dispatch(fetchInventory(getState().product.products[i + 1].id));
                    break;
                }
            }
        }
    };
}

export const setProduct = (product) => {
    return {
        type: actions.SET_PRODUCT,
        product: product
    };
}

export const getBrandSuccess = (brands) => {
    return {
        type: actions.GET_BRANDS,
        brands: brands
    };
}

export const getBrandsFailure = (error) => {
    return {
        type: actions.GET_BRANDS_FAILURE,
        error: error
    };
}

export const getBrands = () => {
    return function (dispatch, getState) {
        return callApi('api/products/brands', 'get', undefined, `Bearer ${getState().authentication.token}`).then(
            res => dispatch(getBrandSuccess(res)),
            error => dispatch(getBrandsFailure(error))
        );
    };
};

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