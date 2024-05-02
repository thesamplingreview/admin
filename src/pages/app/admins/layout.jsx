import { useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { ModuleProvider } from '@/contexts/ModuleContext.jsx';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';

export default function AdminLayout() {
  const doFetch = useFetch();
  const endpointOptions = useRoleEndpoint('/admins/all/options');

  const fetchOptions = useCallback(() => {
    return doFetch(endpointOptions)
      .then(({ data }) => data);
  }, [doFetch, endpointOptions]);

  return (
    <ModuleProvider fetchInit={fetchOptions} >
      <Outlet />
    </ModuleProvider>
  );
}
