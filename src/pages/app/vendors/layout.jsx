import { Outlet } from 'react-router-dom';
import { ModuleProvider } from '@/contexts/ModuleContext.jsx';

export default function VendorLayout() {
  return (
    <ModuleProvider>
      <Outlet />
    </ModuleProvider>
  );
}
