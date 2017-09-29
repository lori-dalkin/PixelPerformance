import { ATTEMPT_LOGIN } from './action-types';

export const attemptLogin = (credentials) => {
	console.log("attempting login");
	return {
		type: ATTEMPT_LOGIN,
		payload: credentials
	}
}