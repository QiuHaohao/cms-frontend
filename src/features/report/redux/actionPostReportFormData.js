import {
  REPORT_ACTION_POST_REPORT_FORM_DATA_BEGIN,
  REPORT_ACTION_POST_REPORT_FORM_DATA_SUCCESS,
  REPORT_ACTION_POST_REPORT_FORM_DATA_FAILURE,
  REPORT_ACTION_POST_REPORT_FORM_DATA_DISMISS_ERROR,
} from './constants';

import { getFullUrl } from '../../../utils'

import rp from 'request-promise'
import { message } from 'antd';


export function actionPostReportFormData(formData) {
  return (dispatch) => { 
    dispatch({
      type: REPORT_ACTION_POST_REPORT_FORM_DATA_BEGIN,
      formData
    });

    const promise = new Promise((resolve, reject) => {
      const uri = getFullUrl("/report")
      var options = {
          method: 'POST',
          uri,
          body: formData,
          json: true // Automatically stringifies the body to JSON
      };

      const doRequest = rp(options)

      doRequest.then(
        (res) => {
          dispatch({
            type: REPORT_ACTION_POST_REPORT_FORM_DATA_SUCCESS,
            data: res,
          });
          message.success("Incident successfully reported!")
          resolve(res);
        }
      ).catch(
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: REPORT_ACTION_POST_REPORT_FORM_DATA_FAILURE,
            data: { error: err },
          });
          message.error("An Error Occurred! Please try again!")
          resolve(err);
        }
      );
    });

    return promise;
  };
}

export function dismissActionPostReportFormDataError() {
  return {
    type: REPORT_ACTION_POST_REPORT_FORM_DATA_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case REPORT_ACTION_POST_REPORT_FORM_DATA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        actionPostReportFormDataPending: true,
        actionPostReportFormDataError: null,
      };

    case REPORT_ACTION_POST_REPORT_FORM_DATA_SUCCESS:
      // The request is success
      return {
        ...state,
        actionPostReportFormDataPending: false,
        actionPostReportFormDataError: null,
      };

    case REPORT_ACTION_POST_REPORT_FORM_DATA_FAILURE:
      // The request is failed
      return {
        ...state,
        actionPostReportFormDataPending: false,
        actionPostReportFormDataError: action.data.error,
      };

    case REPORT_ACTION_POST_REPORT_FORM_DATA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        actionPostReportFormDataError: null,
      };

    default:
      return state;
  }
}
