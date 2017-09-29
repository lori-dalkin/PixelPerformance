import { REJECT_LOGIN, SHOW_SNACKBAR, HIDE_SNACKBAR } from '../actions/action-types';

const initialState = { open: false };

export default function (state = initialState, action) {
    switch (action.type) {
    	case SHOW_SNACKBAR:
      	return { ...state, open: true };
      	break;
      case HIDE_SNACKBAR:
      	return { ...state, open: false };
      	break;
      case REJECT_LOGIN:
      	return { ...state, open: true, message: "Invalid credentials, try again." };
      	break;
    }
    return state;
}