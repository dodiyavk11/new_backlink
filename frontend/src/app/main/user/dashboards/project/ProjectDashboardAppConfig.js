import { lazy } from 'react';

const ProjectDashboardApp = lazy(() => import('./ProjectDashboardApp'));

const ProjectDashboardAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'user/project',
      element: <ProjectDashboardApp />,
    },
  ],
};

export default ProjectDashboardAppConfig;
