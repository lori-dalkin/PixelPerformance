import {combineReducers} from 'redux';

import authentication from './authentication';
import snackbar from './snackbar';

const reducers = combineReducers({
	authentication,
	snackbar
});

export default reducers
