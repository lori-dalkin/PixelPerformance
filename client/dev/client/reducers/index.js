import { combineReducers } from 'redux';

import authentication from './authentication';
import product from './product';
import snackbar from './snackbar';

const reducers = combineReducers({
	authentication,
    product
	snackbar
});

export default reducers;
