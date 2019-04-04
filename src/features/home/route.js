import {
  DefaultPage,
} from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: 'default-page',
      name: 'Default page',
      component: DefaultPage,
      isIndex: true,
    },
    { path: 'crisis-map',
      name: 'Crisis Map',
      component: DefaultPage,
      isIndex: false,
    },
    { path: 'report-crisis',
      name: 'Report Crisis',
      component: DefaultPage,
      isIndex: false,
    },
  ],
};
