import { Payment } from '@mui/icons-material';
import { lazy } from 'react';

const PaymentApp = lazy(() => import('./Userall'));

const usersConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'admin/users',
      element: <PaymentApp />,
    },
    
    
  ],
  
};

export default usersConfig;
