import { Outlet } from 'react-router-dom';
import { ModuleProvider } from '@/contexts/ModuleContext.jsx';

export default function SystemLayout() {
  return (
    <ModuleProvider>
      <Outlet />
    </ModuleProvider>
  );
}
