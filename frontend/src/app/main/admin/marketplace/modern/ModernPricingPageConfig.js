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
      path: '/admin/backlinks',
      element: <ModernPricingPage />,
    },
  ],
};

export default ModernPricingPageConfig;
