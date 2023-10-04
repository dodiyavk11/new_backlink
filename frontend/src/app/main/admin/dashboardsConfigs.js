import AnalyticsDashboardAppConfig from './analytics/AnalyticsDashboardAppConfig';
import ProjectDashboardAppConfig from './project/ProjectDashboardAppConfig';
import FinanceDashboardAppConfig from './finance/FinanceDashboardAppConfig';

import profileAppConfig from './profile/profileAppConfig';
import paymentConfig from './payments/paymentConfig';
import usersConfig from './allusers/usersConfig';
const dashboardsConfigs = [
  AnalyticsDashboardAppConfig,
  ProjectDashboardAppConfig,
  FinanceDashboardAppConfig,
  usersConfig,
  profileAppConfig,
  paymentConfig
];

export default dashboardsConfigs;
