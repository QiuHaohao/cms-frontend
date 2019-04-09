// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  AUTH_ACTION_LOGIN,
} from './constants';

export function actionLogin(username, remember) {
  return {
    type: AUTH_ACTION_LOGIN,
    username,
    remember
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_ACTION_LOGIN:
      if (action.remember) {
        localStorage.setItem("loggedIn", true)
        localStorage.setItem("username", action.username)
      }
      return {
        ...state,
        login: true,
        username: action.username
      };

    default:
      return state;
  }
}
