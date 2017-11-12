import * as actions from './action-types';
import callApi from '../utils/apiCaller';

export const fetchCartItems = () => {
  return (dispatch, getState) => {
  	if (getState().authentication && getState().authentication.token) {
  		dispatch({ type: actions.FETCH_CART_ITEMS });
      return callApi('api/carts', 'get', undefined, `Bearer ${getState().authentication.token}`).then(
          res => dispatch(receiveCartItems((res.inventory !== undefined)?res.inventory:[
          	{inventoryType: {brand: "Dell", price: "799", electronicType: "Monitor"}},
          	{inventoryType: {brand: "Asus", price: "1799", electronicType: "Laptop"}},
          	])),
          error => dispatch(receiveCartItems([]))
      );
    }
  };
}

export const receiveCartItems = (items) => {
  return { type: actions.RECEIVE_CART_ITEMS, items };
}

export const checkoutCart = () => {
	return (dispatch, getState) => {
  	if (getState().authentication && getState().authentication.token) {
  		dispatch({ type: actions.CHECKOUT_CART });
      return callApi('api/carts', 'post', undefined, `Bearer ${getState().authentication.token}`).then(
          res => dispatch(receiveCheckoutResult(res.status)),
          error => console.log(error)
      );
    }
  };
}

export const receiveCheckoutResult = (code) => {
	return { type: actions.RECEIVE_CHECKOUT_CART_RESULT, code };
}