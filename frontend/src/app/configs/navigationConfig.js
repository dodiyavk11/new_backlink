import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import authRoles from '../auth/authRoles';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'dashboards.analytics',
    title: 'Dashboard',
    type: 'item',
    icon: 'heroicons-outline:chart-pie',
    url: '/admin/dashboard',
    auth: authRoles.admin

  },
  {
    id: 'dashboards.analytics1',
    title: 'Dashboard',
    type: 'item',
    icon: 'heroicons-outline:chart-pie',
    url: '/user/dashboard',
    auth: authRoles.user,
  },
  {
    id: 'projects',
    title: 'Project',
    type: 'collapse',
    icon: 'heroicons-outline:clipboard-check',
    url: '/admin/project',
    auth: authRoles.admin,
    children: [
      // {
      //   id: 'dashboards.project',
      //   title: 'Project',
      //   type: 'item',
      //   url: '/admin/project',
        
      // },
      {
        id: 'backlinks',
        title: 'backliks',
        type: 'item',
        url: '/admin/backlinks',
      },

    ],
  },
  {
    id: 'dashboards.project1',
    title: 'Project',
    type: 'item',
    icon: 'heroicons-outline:clipboard-check',
    url: '/user/project',
    auth: authRoles.user
  },
  {
    id: 'dashboards.finance',
    title: 'Orders',
    type: 'item',
    icon: 'heroicons-outline:newspaper',
    url: '/user/finance',
    auth: authRoles.user
  },
  {
    id: 'dashboards.finance1',
    title: 'Orders',
    type: 'item',
    icon: 'heroicons-outline:newspaper',
    url: '/admin/orders',
    auth: authRoles.admin
  },
  {
    id: 'dashboards.users',
    title: 'Users',
    type: 'item',
    icon: 'heroicons-outline:users',
    url: '/admin/users',
    auth: authRoles.admin
  },
  {
    id: 'dashboards.plans',
    title: 'Plans',
    type: 'item',
    icon: 'material-outline:local_play',
    url: '/admin/plans',
    auth: authRoles.admin
  },
  {
    id: 'marketplace',
    title: 'MarketPlace',
    type: 'collapse',
    icon: 'heroicons-outline:link',
    auth: authRoles.user,
    children: [
      {
        id: 'marketplace.modern',
        title: 'Backlinks',
        type: 'item',
        url: '/marketplace/modern',
      },
      {
        id: 'marketplace.simple',
        title: 'Link Bundles',
        type: 'item',
        url: '/marketplace/simple',
      },

    ],
  }

];

export default navigationConfig;
