import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';
import { appRoute } from '@/helpers/route';
import CAvatar from '@/components/CAvatar.jsx';
import { DataTable } from '@/components/DataTable';

export default function ListTable() {
  const navigate = useNavigate();
  const doFetch = useFetch();
  const endpointGet = useRoleEndpoint('/vendors');

  const columns = [
    {
      key: 'logo_url',
      name: 'Logo',
      width: 80,
      render(data) {
        if (!data.logo_url) {
          return '-';
        }
        return <CAvatar name={data.name} src={data.logo_url} sx={{ width: 60, height: 60 }} />;
      },
    },
    {
      key: 'name',
      name: 'Name',
      sortable: true,
    },
    {
      key: 'profile',
      name: 'Profile',
    },
  ];

  const fetchData = useCallback(({
    page, perPage, sort, filters,
  }) => {
    const params = {
      ...filters,
      page,
      sort,
      per_page: perPage,
    };
    return doFetch(endpointGet, { params })
      .then((result) => {
        if (result.code !== 200) {
          throw new Error('Invalid response');
        }
        return result;
      });
  }, [doFetch, endpointGet]);

  const handleSelect = (data) => {
    navigate(appRoute(`/vendors/${data.id}`));
  };

  return (
    <DataTable
      columns={columns}
      initData={{
        page: 1,
        perPage: 20,
        sort: '',
        filters: {},
      }}
      dataProps={{
        data: 'data',
        total: 'meta.total',
      }}
      selectable
      fetcher={fetchData}
      onSelect={handleSelect}
    />
  );
}
