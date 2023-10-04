import { lazy } from 'react';

const ProfileApp = lazy(() => import('./ProfileApp'));

const profileAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'settings/profile',
      element: <ProfileApp />,
    },
    {
      path: 'settings/account',
      element: <ProfileApp />,
    },
    {
      path: 'settings/notifications',
      element: <ProfileApp />,
    },
    
  ],
  
};

export default profileAppConfig;
