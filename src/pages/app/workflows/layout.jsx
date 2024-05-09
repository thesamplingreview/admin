import { Outlet } from 'react-router-dom';
import { ModuleProvider } from '@/contexts/ModuleContext.jsx';

export default function WorkflowLayout() {
  return (
    <ModuleProvider>
      <Outlet />
    </ModuleProvider>
  );
}
