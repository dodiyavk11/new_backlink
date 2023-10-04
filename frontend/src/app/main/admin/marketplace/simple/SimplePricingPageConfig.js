import { lazy } from 'react';

const SimplePricingPage = lazy(() => import('./SimplePricingPage'));

const SimplePricingPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/admin/plans',
      element: <SimplePricingPage />,
    },
  ],
};

export default SimplePricingPageConfig;
