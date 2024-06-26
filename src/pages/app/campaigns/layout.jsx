import { useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { ModuleProvider } from '@/contexts/ModuleContext.jsx';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';

export default function CampaignLayout() {
  const doFetch = useFetch();
  const endpointGet = useRoleEndpoint('/campaigns/all/options');

  const fetchOptions = useCallback(() => {
    return doFetch(endpointGet)
      .then(({ data }) => data);
  }, [doFetch, endpointGet]);

  return (
    <ModuleProvider fetchInit={fetchOptions} >
      <Outlet />
    </ModuleProvider>
  );
}
