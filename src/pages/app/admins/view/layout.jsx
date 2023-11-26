import { useState } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { useOnce } from '@/helpers/hooks';
import { useFetch } from '@/contexts/hooks/auth';
import { useModel } from '@/contexts/hooks/module';
import CLoader from '@/components/CLoader.jsx';
import CError from '@/components/CError.jsx';

export default function AdminViewLayout() {
  const { id } = useParams();
  const doFetch = useFetch();
  const [, setModel] = useModel();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchModel = async () => {
    setLoading(true);
    try {
      const { code, data } = await doFetch(`/v1/admin/admins/${id}`);
      if (code !== 200) {
        throw new Error('API error');
      }
      setModel(data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useOnce(() => {
    fetchModel();
  });

  if (loading) {
    return <CLoader full="header" />;
  }
  if (error) {
    return <CError full="header" message={error.message} />;
  }
  return <Outlet />;
}
