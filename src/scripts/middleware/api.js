/*
 * This file is part of the Watson Chatbot Test App.
 */

import queryString from 'query-string';

export const BASE_URL = '/v1';

/**
 * Creates request object and returns a fetch promise.
 *
 * @param {string} endpoint
 * @param {string} method
 * @param {object} body
 *
 * @return {Promise}
 */
function callApi(endpoint, method, body) {
  const { Headers, fetch } = window;

  const request = {
    method: method || 'GET',
    credentials: 'same-origin',
    headers: new Headers(),
  };

  request.headers.append('X-Requested-With', 'XMLHttpRequest');
  request.headers.append('Content-Type', 'application/json');
  request.headers.append('Accept', 'application/json');

  if (body) {
    if (typeof body !== 'object') {
      return new Promise((resolve, reject) =>
        reject('Body must be an object.')
      );
    }

    switch (method) {
      case 'POST':
        request.body = JSON.stringify(body);
        break;

      case 'GET':
        endpoint += `?${queryString.stringify(body)}`;
        break;

      default:
      // no-op
    }
  }

  return fetch(BASE_URL + endpoint, request)
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok || json.error) {
        if (typeof json.error === 'string') {
          json.error = JSON.parse(json.error);
        }

        return new Promise((resolve, reject) => reject(json));
      }

      return json;
    })
    .catch(err => Promise.reject(err));
}

/**
 * API symbol.
 *
 * @type {Symbol}
 */
export const API = Symbol('API');

/**
 * Api middleware, wraps action with fetch request. Subsequently triggers actions
 * corresponding to the types passed with the initial action.
 *
 * @return {Promise}
 */
export default () => next => action => {
  const actionData = action[API];

  // Prevent middleware from going past this point if not API is specified.
  if (typeof actionData === 'undefined') {
    return next(action);
  }

  const { endpoint, method, body, types } = actionData;
  const [requestType, successType, failureType] = types;

  next({ type: requestType, payload: { message: body.message } });

  return callApi(endpoint, method, body).then(
    response =>
      next({
        type: successType,
        payload: {
          ...response,
        },
      }),
    errors =>
      next({
        type: failureType,
        payload: {
          ...(errors || { message: 'There was an error.' }),
          id: body.message.id,
        },
      })
  );
};
