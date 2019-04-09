import {
  MAP_ACTION_RESOLVE_INCIDENT_BEGIN,
  MAP_ACTION_RESOLVE_INCIDENT_SUCCESS,
  MAP_ACTION_RESOLVE_INCIDENT_FAILURE,
  MAP_ACTION_RESOLVE_INCIDENT_DISMISS_ERROR,
  MAP_ACTION_FETCH_DATA_BEGIN,
} from './constants';

import { setAsResolved } from './modifiers'

import { getFullUrl } from '../../../utils'

import rp from 'request-promise'
import { message } from 'antd';

export function actionResolveIncident(id) {
  return (dispatch) => { 
    dispatch({
      type: MAP_ACTION_RESOLVE_INCIDENT_BEGIN,
      id
    });

    const promise = new Promise((resolve, reject) => {
      const uri = getFullUrl("/resolve")
      var options = {
          method: 'POST',
          uri,
          body: { id },
          json: true // Automatically stringifies the body to JSON
      };

      const doRequest = rp(options)

      doRequest.then(
        (res) => {
          dispatch({
            type: MAP_ACTION_RESOLVE_INCIDENT_SUCCESS,
            data: res,
            id
          });
          dispatch({
            type: MAP_ACTION_FETCH_DATA_BEGIN,
          });
          message.success("Incident successfully resolved!")
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: MAP_ACTION_RESOLVE_INCIDENT_FAILURE,
            data: { error: err },
            id
          });
          message.error("There was an error resolving the incident!")
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissActionResolveIncidentError() {
  return {
    type: MAP_ACTION_RESOLVE_INCIDENT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case MAP_ACTION_RESOLVE_INCIDENT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        actionResolveIncidentPending: true,
        actionResolveIncidentError: null,
        idBeingResolved: action.id
      };

    case MAP_ACTION_RESOLVE_INCIDENT_SUCCESS:
      // The request is success
      return {
        ...setAsResolved(state, action.id),
        actionResolveIncidentPending: false,
        actionResolveIncidentError: null,
        idBeingResolved: null
      };

    case MAP_ACTION_RESOLVE_INCIDENT_FAILURE:
      // The request is failed
      return {
        ...state,
        actionResolveIncidentPending: false,
        actionResolveIncidentError: action.data.error,
        idBeingResolved: null
      };

    case MAP_ACTION_RESOLVE_INCIDENT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        actionResolveIncidentError: null,
      };

    default:
      return state;
  }
}
