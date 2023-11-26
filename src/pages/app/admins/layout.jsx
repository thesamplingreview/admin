import { useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { ModuleProvider } from '@/contexts/ModuleContext.jsx';
import { useFetch } from '@/contexts/hooks/auth';

export default function AdminLayout() {
  const doFetch = useFetch();

  const fetchOptions = useCallback(() => {
    return doFetch('/v1/admin/admins/all/options')
      .then(({ data }) => data);
  }, [doFetch]);

  return (
    <ModuleProvider fetchInit={fetchOptions} >
      <Outlet />
    </ModuleProvider>
  );
}
