import * as actions from './action-types';
import callApi from '../utils/apiCaller';

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