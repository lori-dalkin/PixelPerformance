import * as actions from './action-types';
import callApi from '../utils/apiCaller';

export const attemptLogin = (credentials) => {
    return (dispatch) => {
        dispatch(showLoading());
        return callApi('api/users/login', 'post', {
            email: credentials.email,
            password: credentials.password,
        }).then(
            res => dispatch(receiveAttemptLogin(res)),
            error => dispatch(receiveAttemptLogin({ data: undefined }))
        );
    };
}

export const showLoading = () => {
    return { type: actions.ATTEMPT_LOGIN };
}

export const receiveAttemptLogin = (result) => {
    if (result.data !== undefined) {
        return {
            type: actions.ACCEPT_LOGIN,
            token: result.data,
            userType: result.message
        };
    } else {
        return {
            type: actions.REJECT_LOGIN
        };
    }
}