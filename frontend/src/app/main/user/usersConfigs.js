import AnalyticsDashboardAppConfig from './analytics/AnalyticsDashboardAppConfig';
import ProjectDashboardAppConfig from './project/ProjectDashboardAppConfig';
import FinanceDashboardAppConfig from './finance/FinanceDashboardAppConfig';

import profileAppConfig from './profile/profileAppConfig';
import paymentConfig from './payments/paymentConfig';
// import marketConfigs from './marketplace/marketConfigs';
const usersConfigs = [
  AnalyticsDashboardAppConfig,
  ProjectDashboardAppConfig,
  FinanceDashboardAppConfig,
  // marketConfigs,
  profileAppConfig,
  paymentConfig
];

export default usersConfigs;
