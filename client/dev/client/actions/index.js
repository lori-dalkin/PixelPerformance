import callApi from '../utils/apiCaller';

import { ACCEPT_LOGIN } from './action-types';

export const attemptLogin = (credentials) => {
	console.log("attempting login");
	return (dispatch) => {
    return callApi('api/users/logon', 'post', {
      username: credentials.username,
      password: credentials.password,
    }).then(res => dispatch(receiveAttemptLogin(res)));
  };
}

export const receiveAttemptLogin = (result) => {
	console.log(result);
	return {
    type: ACCEPT_LOGIN,
    token: result.data,
  };
}