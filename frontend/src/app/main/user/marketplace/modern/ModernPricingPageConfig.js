import { lazy } from 'react';

const ModernPricingPage = lazy(() => import('./ModernPricingPage'));

const ModernPricingPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/marketplace/modern',
      element: <ModernPricingPage />,
    },
  ],
};

export default ModernPricingPageConfig;
