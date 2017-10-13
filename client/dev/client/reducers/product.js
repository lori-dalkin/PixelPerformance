import * as actions from '../actions/action-types.js'

const initialState = {
    isFetching: false,
    filterSet: false,
    error: "",
    productFilter: "",
    products: [],
    productViewOpen: false,
    productDeleteOpen: false,
    addProduct: {
        addingProduct: false,
        addProductOpen: false,
        error: false
    },
    selectedProduct: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.SET_PRODUCTS_FILTER:
            return {
                ...state,
                productFilter: action.productFilter,
                filterSet: true
            };
            break;
        case actions.GET_PRODUCTS_REQUEST:
            return {
                ...state,
                isFetching: true
            };
            break;
        case actions.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.products,
                isFetching: false,
                filterSet: false
            };
            break;
        case actions.GET_PRODUCTS_FAILURE:
            return {
                ...state,
                error: action.error,
                isFetching: false,
                filterSet: false
            };
            break;
        case actions.SHOW_PRODUCT_VIEW_DIALOG:
            return { ...state, productViewOpen: true, selectedProduct: action.product };
            break;
        case actions.HIDE_PRODUCT_VIEW_DIALOG:
            return { ...state, productViewOpen: false };
            break;
        case actions.SHOW_DELETE_PRODUCT_DIALOG:
            return { ...state, productDeleteOpen: true, selectedProduct: action.product };
            break;
        case actions.HIDE_DELETE_PRODUCT_DIALOG:
            return { ...state, productDeleteOpen: false };
            break;
        case actions.SHOW_ADD_PRODUCT_DIALOG:
            return { 
                ...state,
                addProduct: {
                    ...state.addProduct,
                    addProductOpen: true 
                }
            };
            break;
        case actions.HIDE_ADD_PRODUCT_DIALOG:
            return { 
                ...state,
                addProduct: {
                    ...state.addProduct,
                    addProductOpen: false
                }
            };
            break;
        case actions.ADD_PRODUCT_REQUEST:
            return {
                ...state,
                addProduct: {
                    ...state.addProduct,
                    addingProduct: true
                }
            };
            break;
        case actions.ADD_PRODUCT_SUCCESS:
            let currProducts = state.products;
            currProducts.push(action.product);
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
        case actions.ADD_PRODUCT_FAILURE:
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