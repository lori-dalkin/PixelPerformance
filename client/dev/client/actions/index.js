import callApi from '../utils/apiCaller';

import { ACCEPT_LOGIN, SET_TOKEN, DELETE_TOKEN, REJECT_LOGIN, ATTEMPT_LOGIN, HIDE_SNACKBAR, SHOW_SNACKBAR } from './action-types';

export const attemptLogin = (credentials) => {
	return (dispatch) => {
    dispatch(showLoading());
    return callApi('api/users/login', 'post', {
      email: credentials.email,
      password: credentials.password,
    }).then(res => dispatch(receiveAttemptLogin(res)));
  };
}

export const showLoading = () => {
  return {
    type: ATTEMPT_LOGIN,
  };
}

export const receiveAttemptLogin = (result) => {
  if(result.data !== undefined){
  	return {
      type: ACCEPT_LOGIN,
      token: result.data,
    };
  }else{
    return {
      type: REJECT_LOGIN
    };
  }
}

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    token: token
  };
}

export const deleteToken = () => {
  return {
    type: DELETE_TOKEN
  };
}

export const showSnackbar = () => {
  return { type: SHOW_SNACKBAR };
}

export const hideSnackbar = () => {
  return { type: HIDE_SNACKBAR };
}