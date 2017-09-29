import 'fetch';

const API_PORT = 8080;
const API_URL = "http://localhost";

export default function callApi(endpoint, method = 'get', body) {
  return fetch(`${API_URL}:${API_PORT}/${endpoint}`, {
    headers: { 'content-type': 'application/json' },
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  })
  .then(
    response => response,
    error => error
  );
}