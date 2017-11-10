import { combineReducers } from 'redux';

import authentication from './authentication';
import product from './product';
import snackbar from './snackbar';
import registration from './registration';
import cart from './cart';

const reducers = combineReducers({
	authentication,
  product,
	snackbar,
	registration,
	cart
});

export default reducers;
