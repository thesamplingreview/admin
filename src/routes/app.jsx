import { Navigate } from 'react-router-dom';
import AppLayout from '@/pages/app/layout.jsx';
import vendorsRoutes from '@/pages/app/vendors/routes';
import productsRoutes from '@/pages/app/products/routes';
import formsRoutes from '@/pages/app/forms/routes';
import usersRoutes from '@/pages/app/users/routes';
import adminsRoutes from '@/pages/app/admins/routes';

/**
 * NOTE: not using react-router loader to preload the data as the method doesn't works well with <suspense>, hence will using own context to handle it
 */
const routes = [
  {
    key: 'index',
    index: true,
    element: <Navigate to='./dashboard' />,
  },
  {
    key: 'dashboard',
    path: 'dashboard',
    async lazy() {
      const { Dashboard } = await import('@/pages/app/dashboard/index.jsx');
      return { Component: Dashboard };
    },
  },
  ...adminsRoutes,
  ...usersRoutes,
  ...productsRoutes,
  ...vendorsRoutes,
  ...formsRoutes,
];

const layout = <AppLayout />;

export default {
  routes,
  layout,
};
