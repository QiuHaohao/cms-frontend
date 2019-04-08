// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  PageAuth,
} from './';

export default {
  path: 'auth',
  name: 'Auth',
  childRoutes: [
    { path: 'page-auth', name: 'Page auth', component: PageAuth, isIndex: true },
  ],
};
