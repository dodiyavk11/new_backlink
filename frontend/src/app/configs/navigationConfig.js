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
    auth:authRoles.admin
    
  },
  {
    id: 'dashboards.analytics1',
    title: 'Dashboard',
    type: 'item',
    icon: 'heroicons-outline:chart-pie',
    url: '/user/dashboard',
    auth:authRoles.user,
  },
  {
    id: 'dashboards.project',
    title: 'Project',
    type: 'item',
    icon: 'heroicons-outline:clipboard-check',
    url: '/admin/project',
    auth:authRoles.admin
  },
  {
    id: 'dashboards.project1',
    title: 'Project',
    type: 'item',
    icon: 'heroicons-outline:clipboard-check',
    url: '/user/project',
    auth:authRoles.user
  },
    {
        id: 'dashboards.finance',
        title: 'Orders',
        type: 'item',
        icon: 'heroicons-outline:newspaper',
        url: '/dashboards/finance',
    },
  {
    id: 'marketplace',
    title: 'MarketPlace',
    type: 'collapse',
    icon: 'heroicons-outline:link',
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
