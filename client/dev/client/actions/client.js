import * as actions from './action-types';
import callApi from '../utils/apiCaller';
import { deleteToken, deleteUserType } from './index';

export const fetchClients = () => {
  return (dispatch, getState) => {
  	if (getState().authentication && getState().authentication.token) {
  		dispatch({ type: actions.FETCH_CLIENTS });
      return callApi('api/users', 'get', undefined, `Bearer ${getState().authentication.token}`).then(
          res => dispatch(receiveClients(res)),
          error => dispatch(receiveClients([]))
      );
    }
  };
}

export const receiveClients = (clients) => {
  return { type: actions.RECEIVE_CLIENTS, clients };
}

export const deleteClient = () => {
  return (dispatch, getState) => {
    if (getState().authentication && getState().authentication.token) {
      return callApi('api/users', 'delete', undefined, `Bearer ${getState().authentication.token}`).then(
          res => {dispatch(deleteToken()); dispatch(deleteUserType())},
          error => console.log(error)
      );
    }
  };
}