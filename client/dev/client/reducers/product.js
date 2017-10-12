import { ACCEPT_LOGIN, SET_TOKEN, DELETE_TOKEN, REJECT_LOGIN, ATTEMPT_LOGIN, HIDE_SNACKBAR, SHOW_SNACKBAR, 
    SET_PRODUCTS_FILTER, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE,
    SHOW_PRODUCT_VIEW_DIALOG, HIDE_PRODUCT_VIEW_DIALOG, GET_SPECIFIC_PRODUCT, ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAILURE, SHOW_ADD_PRODUCT_DIALOG, HIDE_ADD_PRODUCT_DIALOG,
    SHOW_MODIFY_PRODUCT_DIALOG, HIDE_MODIFY_PRODUCT_DIALOG, MODIFY_PRODUCT_REQUEST, MODIFY_PRODUCT_SUCCESS,
    MODIFY_PRODUCT_FAILURE } from '../actions/action-types';

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
    },
    modifyProduct: {
        id: '',
        modifyingProduct: false,
        modifyProductOpen: false,
        error: false,
        state: {}
    },
    selectedProduct: {}
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
            return { ...state, productViewOpen: true, selectedProduct: action.product };
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
                    addingProduct: true,
                    error: false
                }
            };
            break;
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
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
        case SHOW_MODIFY_PRODUCT_DIALOG:
            return {
                ...state,
                modifyProduct: {
                    ...state.modifyProduct,
                    modifyProductOpen: true
                }
            };
            break;
        case HIDE_MODIFY_PRODUCT_DIALOG:
            return {
                ...state,
                modifyProduct: {
                    ...state.modifyProduct,
                    modifyProductOpen: false
                }
            };
            break;
        case MODIFY_PRODUCT_REQUEST:
            return {
                ...state,
                modifyProduct: {
                    ...state.modifyProduct,
                    modifyingProduct: true,
                    error: false
                }
            };
            break;
        case MODIFY_PRODUCT_SUCCESS:
            return {
                ...state,
                modifyProduct: {
                    ...state.modifyProduct,
                    modifyingProduct: false,
                    error: false
                }
            };
            break;
        case MODIFY_PRODUCT_FAILURE:
            return {
                ...state,
                modifyProduct: {
                    ...state.modifyProduct,
                    modifyingProduct: false,
                    error: true
                }
            }
            break;
        default:
            return state;
    }
}