import { Outlet } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext.jsx';
import { ToastProvider } from '@/contexts/ToastContext.jsx';

export default function Root() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Outlet />
      </ToastProvider>
    </AuthProvider>
  );
}
