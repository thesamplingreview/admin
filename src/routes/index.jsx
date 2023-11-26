import { createBrowserRouter, Navigate } from 'react-router-dom';
import { APP_ROUTE, AUTH_ROUTE } from '@/config/route';
import Root from '@/layouts/Root.jsx';
import AppRoute from './app.jsx';
import AuthRoute from './auth.jsx';

const routes = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Navigate to={AUTH_ROUTE} />,
      },
      {
        path: APP_ROUTE,
        element: AppRoute.layout,
        children: AppRoute.routes,
      },
      {
        path: AUTH_ROUTE,
        element: AuthRoute.layout,
        children: AuthRoute.routes,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
