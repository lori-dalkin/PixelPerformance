import * as actions from '../actions/action-types.js'

const initialState = {
    isFetchingCart: false,
    inventory: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case actions.FETCH_CART_ITEMS:
      	return { ...state, isFetchingCart: true, inventory: [] };
      	break;
    case actions.RECEIVE_CART_ITEMS:
      	return { ...state, isFetchingCart: true, inventory: [] };
      	break;
		default:
      return state;
	}
}