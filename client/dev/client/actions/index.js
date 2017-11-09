import * as actions from './action-types';

// -----------------------------------------------
//                    TOKEN
//------------------------------------------------
export const setToken = (token) => {
    return {
        type: actions.SET_TOKEN,
        token: token
    };
}

export const deleteToken = () => { return { type: actions.DELETE_TOKEN }; }

// -----------------------------------------------
//                    USERTYPE
//------------------------------------------------
export const setUserType = (userType) => {
    return {
        type: actions.SET_USER_TYPE,
        userType: userType
    };
}

    export const deleteUserType = () => { return { type: actions.DELETE_USER_TYPE }; }

// -----------------------------------------------
//                 SNACKBAR
//------------------------------------------------
export const showSnackbar = () => { return { type: actions.SHOW_SNACKBAR }; }

export const hideSnackbar = () => { return { type: actions.HIDE_SNACKBAR }; }

// -----------------------------------------------
//             PRODUCT VIEW MODAL
//------------------------------------------------
export const showProductView = (product) => {
    return { 
		type: actions.SHOW_PRODUCT_VIEW_DIALOG,
		product
	};
}

export const hideProductView = () => { return { type: actions.HIDE_PRODUCT_VIEW_DIALOG }; }

// -----------------------------------------------
//              ADD PRODUCT MODAL
//------------------------------------------------
export const showAddProduct = () => { return { type: actions.SHOW_ADD_PRODUCT_DIALOG }; }

export const hideAddProduct = () => { return { type: actions.HIDE_ADD_PRODUCT_DIALOG }; }

// -----------------------------------------------
//             DELETE PRODUCT MODAL
//------------------------------------------------
export const showDeleteProduct = (product) => {
    return { 
		type: actions.SHOW_DELETE_PRODUCT_DIALOG,
		product
	};
}

export const hideDeleteProduct = () => { return { type: actions.HIDE_DELETE_PRODUCT_DIALOG }; }

// -----------------------------------------------
//             MODIFY PRODUCT MODAL
//------------------------------------------------
export const showModifyProduct = (product) => { 
    return { 
        type: actions.SHOW_MODIFY_PRODUCT_DIALOG,
        product
    }; 
}

export const hideModifyProduct = () => { return { type: actions.HIDE_MODIFY_PRODUCT_DIALOG }; }

// -----------------------------------------------
//              REGISTRATION MODAL
//------------------------------------------------
export const showRegistration = () => { return { type: actions.SHOW_REGISTRATION }; }

export const hideRegistration = () => { return { type: actions.HIDE_REGISTRATION }; }