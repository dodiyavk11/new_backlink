import { Payment } from '@mui/icons-material';
import { lazy } from 'react';

const PaymentApp = lazy(() => import('./PaymentApp'));

const paymentConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'account/payments',
      element: <PaymentApp />,
    },
    
    
  ],
  
};

export default paymentConfig;
