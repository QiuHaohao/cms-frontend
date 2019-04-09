// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  AUTH_ACTION_LOGOUT,
} from './constants';

export function actionLogout() {
  return {
    type: AUTH_ACTION_LOGOUT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_ACTION_LOGOUT:
      localStorage.setItem("loggedIn", false)
      localStorage.setItem("username", undefined)
      return {
        ...state,
        login: false,
        username: undefined
      };

    default:
      return state;
  }
}
