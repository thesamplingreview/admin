import { Navigate } from 'react-router-dom';
import AuthLayout from '@/pages/auth/layout.jsx';

// auth routes
const routes = [
  {
    key: 'index',
    index: true,
    element: <Navigate to='./login' />,
  },
  {
    key: 'login',
    path: 'login',
    async lazy() {
      const { default: LoginPage } = await import('@/pages/auth/login/index.jsx');
      return { Component: LoginPage };
    },
  },
  {
    key: 'logout',
    path: 'logout',
    async lazy() {
      const { default: LogoutPage } = await import('@/pages/auth/logout/index.jsx');
      return { Component: LogoutPage };
    },
  },
];

const layout = <AuthLayout />;

export default {
  routes,
  layout,
};
