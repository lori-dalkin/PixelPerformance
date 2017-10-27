import { combineReducers } from 'redux';

import authentication from './authentication';
import product from './product';
import snackbar from './snackbar';
import registration from './registration';

const reducers = combineReducers({
	authentication,
  product,
	snackbar,
	registration
});

export default reducers;
