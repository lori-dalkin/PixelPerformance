import { SET_PRODUCTS_FILTER, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE, 
    SHOW_PRODUCT_VIEW_DIALOG, HIDE_PRODUCT_VIEW_DIALOG, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAILURE, 
    SHOW_ADD_PRODUCT_DIALOG, HIDE_ADD_PRODUCT_DIALOG } from '../actions/action-types.js'

const initialState = {
    isFetching: false,
    error: "",
    productFilter: {},
    products: [],
    productViewOpen: false,
    addProduct: {
        addingProduct: false,
        addProductOpen: false,
        error: false
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PRODUCTS_FILTER:
            return {
                ...state,
                productFilter: action.filter
            };
            break;
        case GET_PRODUCTS_REQUEST:
            return {
                ...state,
                isFetching: true
            };
            break;
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.products,
                isFetching: false
            };
            break;
        case GET_PRODUCTS_FAILURE:
            return {
                ...state,
                error: action.error,
                isFetching: false
            };
            break;
        case SHOW_PRODUCT_VIEW_DIALOG:
            return { ...state, productViewOpen: true };
            break;
        case HIDE_PRODUCT_VIEW_DIALOG:
            return { ...state, productViewOpen: false };
            break;
        case SHOW_ADD_PRODUCT_DIALOG:
            return { 
                ...state,
                addProduct: {
                    ...state.addProduct,
                    addProductOpen: true 
                }
            };
            break;
        case HIDE_ADD_PRODUCT_DIALOG:
            return { 
                ...state,
                addProduct: {
                    ...state.addProduct,
                    addProductOpen: false
                }
            };
            break;
        case ADD_PRODUCT_REQUEST:
            return {
                ...state,
                addProduct: {
                    ...state.addProduct,
                    addingProduct: true
                }
            };
            break;
        case ADD_PRODUCT_SUCCESS:
            let currProducts = state.products;
            currProducts.push(action.product);
            console.log('here');
            return {
                ...state,
                product: currProducts,
                addProduct: {
                    ...state.addProduct,
                    error: false,
                    addingProduct: false
                }
            };
            break;
        case ADD_PRODUCT_FAILURE:
            return {
                ...state,
                addProduct: {
                    ...state.addProduct,
                    error: true,
                    addingProduct: false
                }
            };
            break;
        default:
            return state;
    }
}