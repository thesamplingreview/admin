import { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { ModuleProvider } from '@/contexts/ModuleContext.jsx';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';
import { useOnce } from '@/helpers/hooks';
import CLoader from '@/components/CLoader.jsx';
import CError from '@/components/CError.jsx';

export default function MyLayout() {
  const doFetch = useFetch();
  const endpointGet = useRoleEndpoint('/users/all/options');

  const [my, setMy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // re-using users module options (contact prefixes)
  const fetchOptions = useCallback(() => {
    return doFetch(endpointGet)
      .then(({ data }) => data);
  }, [doFetch, endpointGet]);

  useOnce(async () => {
    setLoading(true);
    try {
      const result = await doFetch('/v1/auth/my');
      setMy(result.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  });

  if (loading) {
    return <CLoader full="header" />;
  }
  if (error) {
    return <CError full="header" message={error.message} />;
  }
  return (
    <ModuleProvider fetchInit={fetchOptions} initModel={my} >
      <Outlet />
    </ModuleProvider>
  );
}
