import callApi from '../utils/apiCaller';

import { ACCEPT_LOGIN, SET_TOKEN, DELETE_TOKEN, REJECT_LOGIN, ATTEMPT_LOGIN, HIDE_SNACKBAR, SHOW_SNACKBAR, ADD_PRODUCT } from './action-types';

export const attemptLogin = (credentials) => {
	return (dispatch) => {
    dispatch(showLoading());
    return callApi('api/users/logon', 'post', {
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

export const addProduct = (param) => {
  return (dispatch) => {
    return callApi('api/products', 'post', {
        id: param.id,
        weight: param.weight,
        modelNumber: param.modelNumber,
        brand: param.brand,
        price: param.price,
        electronicType: param.electronicType,
        processor: param.processor,
        ram: param.ram,
        hardDrive: param.hardDrive,
        cpus: param.cpus,
        os: param.os,
        dimensions: param.dimensions,
        type: param.type,
        displaySize: param.displaySize,
        battery: param.battery,
        camera: param.camera,
        touchscreen: param.touchscreen,
        size: param.size,
    }).then(res => dispatch(receiveAddAttempt(res)));
  };
}

export const receiveAddAttempt = (result) => {
    if(result.data !== undefined){
        return {
            type: CONFIRM_ADD,
        };
    }else{
        return {
            type: REJECT_ADD
        };
    }
};