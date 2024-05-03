import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';
import { appRoute } from '@/helpers/route';
import { DataTable } from '@/components/DataTable';

export default function ListTable() {
  const navigate = useNavigate();
  const doFetch = useFetch();
  const endpointGet = useRoleEndpoint('/forms');

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
      render(model) {
        const names = model.campaigns?.map((d) => d.name) || [];
        return names.length ? names.join(', ') : '-';
      },
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
    navigate(appRoute(`/forms/${data.id}`));
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
