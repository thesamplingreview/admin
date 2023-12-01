import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '@/contexts/hooks/auth';
import { appRoute } from '@/helpers/route';
import { DataTable, DataTableActions } from '@/components/DataTable';

export default function ListTable() {
  const navigate = useNavigate();
  const doFetch = useFetch();

  const columns = [
    {
      key: 'name',
      name: 'Name',
      sortable: true,
      width: 320,
    },
    {
      key: 'campaigns',
      name: 'Linked Campaigns',
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
                key: 'edit',
                name: 'edit',
                icon: 'fa-pencil',
                route: appRoute(`/users/${model.id}/edit`),
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
    return doFetch('/v1/admin/forms', { params })
      .then((result) => {
        if (result.code !== 200) {
          throw new Error('Invalid response');
        }
        return result;
      });
  }, [doFetch]);

  const handleSelect = (data) => {
    navigate(appRoute(`/forms/${data.id}`));
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
