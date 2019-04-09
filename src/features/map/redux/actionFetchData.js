import {
  MAP_ACTION_FETCH_DATA_BEGIN,
  MAP_ACTION_FETCH_DATA_SUCCESS,
  MAP_ACTION_FETCH_DATA_FAILURE,
  MAP_ACTION_FETCH_DATA_DISMISS_ERROR,
} from './constants';

import { getFullUrl } from '../../../utils'

const _ = require('lodash')


// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function actionFetchData() {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: MAP_ACTION_FETCH_DATA_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const url = getFullUrl("/incidences")
      const doRequest = fetch(url).then((r) => r.json());
      doRequest.then(
        (res) => {
          dispatch({
            type: MAP_ACTION_FETCH_DATA_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: MAP_ACTION_FETCH_DATA_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissActionFetchDataError() {
  return {
    type: MAP_ACTION_FETCH_DATA_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case MAP_ACTION_FETCH_DATA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        actionFetchDataPending: true,
        actionFetchDataError: null,
      };

    case MAP_ACTION_FETCH_DATA_SUCCESS:
      // The request is success
      return {
        ...state,
        data: _.keyBy(action.data, 'id'),
        actionFetchDataPending: false,
        actionFetchDataError: null,
      };

    case MAP_ACTION_FETCH_DATA_FAILURE:
      // The request is failed
      return {
        ...state,
        actionFetchDataPending: false,
        actionFetchDataError: action.data.error,
      };

    case MAP_ACTION_FETCH_DATA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        actionFetchDataError: null,
      };

    default:
      return state;
  }
}
