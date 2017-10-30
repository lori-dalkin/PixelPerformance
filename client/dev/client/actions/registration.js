import * as actions from './action-types';
import callApi from '../utils/apiCaller';

export const attemptRegistration = (credentials) => {
    return (dispatch) => {
        return callApi('api/users', 'post', {
            fname: credentials.fname,
            lname: credentials.lname,
            email: credentials.email,
            password: credentials.password,
            address: credentials.address,
            phone: credentials.phone,
        }).then(
            res => dispatch(receiveAttemptRegistration(res)),
            error => dispatch(receiveAttemptRegistration({ data: undefined }))
        );
    }
}

export const receiveAttemptRegistration = (result) => {
    if (result.data !== undefined) {
        return {
            type: actions.ACCEPT_REGISTRATION,
        };
    } else {
        return {
            type: actions.REJECT_REGISTRATION
        };
    }
}