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
      path: '/marketplace/simple',
      element: <SimplePricingPage />,
    },
  ],
};

export default SimplePricingPageConfig;
