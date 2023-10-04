import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import userInterfaceConfigs from '../main/user-interface/UserInterfaceConfigs';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import dashboardsConfigs from '../main/admin/dashboardsConfigs';
import usersConfigs from '../main/user/usersConfigs';
import appsConfigs from '../main/apps/appsConfigs';
import pagesConfigs from '../main/pages/pagesConfigs';
import authRoleExamplesConfigs from '../main/auth/authRoleExamplesConfigs';
import authRoles from '../auth/authRoles';
import adminmarketConfig from '../main/admin/marketplace/marketConfigs';
import { AuthProvider } from '../auth/AuthContext';
import {  setUser } from 'app/store/userSlice';
import marketConfigs from '../main/user/marketplace/marketConfigs';



const routeConfigs = [
  ...appsConfigs,
  ...dashboardsConfigs,
  ...usersConfigs,
  ...pagesConfigs,
  ...authRoleExamplesConfigs,
  ...adminmarketConfig,
  ...userInterfaceConfigs,
  ...marketConfigs,
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
];
// const { user } = useAuth();
// console.log(setUser);
const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: '/',
    element: <Navigate to="admin/dashboard" />,
    auth: authRoles.admin,
  },
  {
    path: '/user',
    element: <Navigate to="/user/dashboard" />,
    auth: authRoles.user,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '*',
    element: <Navigate to="pages/error/404" />,
  },
];

export default routes;
