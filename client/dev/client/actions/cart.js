import * as actions from './action-types';

export const fetchCart = () => {
    return (dispatch, getState) => {
    	if (getState().authentication && getState().authentication.token) {
        return callApi('api/cart', 'get', undefined, `Bearer ${getState().authentication.token}`).then(
            res => dispatch(receiveCart((res.inventory !== undefined)?res.inventory:[])),
            error => dispatch(receiveCart([]))
        );
      }
    };
}

export const receiveCart = (items) => {
    return { type: actions.RECEIVE_CART_ITEMS, items };
}