// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  PageReportCrisis,
} from './';

export default {
  path: 'report',
  name: 'Report',
  childRoutes: [
    { path: 'page-report-crisis', name: 'Page report crisis', component: PageReportCrisis, isIndex: true },
  ],
};
