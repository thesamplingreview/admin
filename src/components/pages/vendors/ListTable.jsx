import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '@/contexts/hooks/auth';
import { appRoute } from '@/helpers/route';
import CAvatar from '@/components/CAvatar.jsx';
import { DataTable, DataTableActions } from '@/components/DataTable';

export default function ListTable() {
  const navigate = useNavigate();
  const doFetch = useFetch();

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
    {
      key: 'actions',
      name: '',
      width: 100,
      align: 'right',
      stopPropagate: true,
      render(model) {
        return (
          <DataTableActions
            actions={[
              {
                key: 'view',
                name: 'View',
                icon: 'fa-file-lines',
                route: appRoute(`/vendors/${model.id}`),
              },
              {
                key: 'edit',
                name: 'edit',
                icon: 'fa-pencil',
                route: appRoute(`/vendors/${model.id}/edit`),
              },
            ]}
          />
        );
      },
    },
  ];

  const fetchData = useCallback(({ page, sort, filters }) => {
    const params = {
      ...filters,
      page,
      sort,
    };
    return doFetch('/v1/admin/vendors', { params })
      .then((result) => {
        if (result.code !== 200) {
          throw new Error('Invalid response');
        }
        return result;
      });
  }, [doFetch]);

  const handleSelect = (data) => {
    navigate(appRoute(`/vendors/${data.id}`));
  };

  return (
    <DataTable
      columns={columns}
      initData={{
        page: 1,
        perPage: 10,
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
