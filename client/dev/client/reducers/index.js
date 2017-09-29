import {combineReducers} from 'redux';

import authentication from './authentication';
import product from './product';

const reducers = combineReducers({
	authentication,
    product
});

export default reducers;
