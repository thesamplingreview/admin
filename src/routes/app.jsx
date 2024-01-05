import { Navigate } from 'react-router-dom';
import AppLayout from '@/pages/app/layout.jsx';
import dashboardRoutes from '@/pages/app/dashboard/routes';
import vendorsRoutes from '@/pages/app/vendors/routes';
import campaignsRoutes from '@/pages/app/campaigns/routes';
import enrolmentsRoutes from '@/pages/app/enrolments/routes';
import productsRoutes from '@/pages/app/products/routes';
import formsRoutes from '@/pages/app/forms/routes';
import usersRoutes from '@/pages/app/users/routes';
import adminsRoutes from '@/pages/app/admins/routes';
import systemRoutes from '@/pages/app/system/routes';

/**
 * NOTE: not using react-router loader to preload the data as the method doesn't works well with <suspense>, hence will using own context to handle it
 */
const routes = [
  {
    key: 'index',
    index: true,
    element: <Navigate to='./dashboard' />,
  },
  ...dashboardRoutes,
  ...adminsRoutes,
  ...usersRoutes,
  ...productsRoutes,
  ...campaignsRoutes,
  ...enrolmentsRoutes,
  ...vendorsRoutes,
  ...formsRoutes,
  ...systemRoutes,
];

const layout = <AppLayout />;

export default {
  routes,
  layout,
};
