import { Outlet } from 'react-router-dom';
import { ModuleProvider } from '@/contexts/ModuleContext.jsx';

export default function ProductLayout() {
  return (
    <ModuleProvider>
      <Outlet />
    </ModuleProvider>
  );
}
