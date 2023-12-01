import { useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { ModuleProvider } from '@/contexts/ModuleContext.jsx';
import { useFetch } from '@/contexts/hooks/auth';

export default function CampaignLayout() {
  const doFetch = useFetch();

  const fetchOptions = useCallback(() => {
    return doFetch('/v1/admin/campaigns/all/options')
      .then(({ data }) => data);
  }, [doFetch]);

  return (
    <ModuleProvider fetchInit={fetchOptions} >
      <Outlet />
    </ModuleProvider>
  );
}
