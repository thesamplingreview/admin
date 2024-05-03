import { useNavigate, Outlet } from 'react-router-dom';
import { usePermissions } from '@/contexts/hooks/auth';
import { ModuleProvider } from '@/contexts/ModuleContext.jsx';
import { appRoute } from '@/helpers/route';
import { useOnce } from '@/helpers/hooks';

export default function SystemLayout() {
  const navigate = useNavigate();
  const [permissions] = usePermissions();
  const accessible = permissions.includes('system:view');

  useOnce(() => {
    if (!accessible) {
      navigate(appRoute('/dashboard'));
    }
  });

  if (!accessible) {
    return null;
  }
  return (
    <ModuleProvider>
      <Outlet />
    </ModuleProvider>
  );
}
