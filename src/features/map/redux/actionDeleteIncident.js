import {
  MAP_ACTION_DELETE_INCIDENT_BEGIN,
  MAP_ACTION_DELETE_INCIDENT_SUCCESS,
  MAP_ACTION_DELETE_INCIDENT_FAILURE,
  MAP_ACTION_DELETE_INCIDENT_DISMISS_ERROR,
} from './constants';


import { getFullUrl } from '../../../utils'

import rp from 'request-promise'
import { message } from 'antd';

export function actionDeleteIncident(id) {
  return (dispatch) => { 
    dispatch({
      type: MAP_ACTION_DELETE_INCIDENT_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const uri = getFullUrl("/delete")
      var options = {
          method: 'POST',
          uri,
          body: { id },
          json: true
      };

      const doRequest = rp(options)

      doRequest.then(
        (res) => {
          dispatch({
            type: MAP_ACTION_DELETE_INCIDENT_SUCCESS,
            data: res,
          });
          message.success("Incident successfully deleted!")
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: MAP_ACTION_DELETE_INCIDENT_FAILURE,
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
export function dismissActionDeleteIncidentError() {
  return {
    type: MAP_ACTION_DELETE_INCIDENT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case MAP_ACTION_DELETE_INCIDENT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        actionDeleteIncidentPending: true,
        actionDeleteIncidentError: null,
      };

    case MAP_ACTION_DELETE_INCIDENT_SUCCESS:
      // The request is success
      return {
        ...state,
        actionDeleteIncidentPending: false,
        actionDeleteIncidentError: null,
      };

    case MAP_ACTION_DELETE_INCIDENT_FAILURE:
      // The request is failed
      return {
        ...state,
        actionDeleteIncidentPending: false,
        actionDeleteIncidentError: action.data.error,
      };

    case MAP_ACTION_DELETE_INCIDENT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        actionDeleteIncidentError: null,
      };

    default:
      return state;
  }
}
