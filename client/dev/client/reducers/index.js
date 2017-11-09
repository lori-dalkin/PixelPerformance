import { combineReducers } from 'redux';

import authentication from './authentication';
import product from './product';
import snackbar from './snackbar';
import registration from './registration';
import history from './history';

const reducers = combineReducers({
	authentication,
  	product,
	snackbar,
	registration,
	history
});

export default reducers;
