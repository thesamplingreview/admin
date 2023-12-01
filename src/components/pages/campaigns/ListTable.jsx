import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { isDate, format } from 'date-fns';
import { useFetch } from '@/contexts/hooks/auth';
import { appRoute, publicRoute } from '@/helpers/route';
import config from '@/config/app';
import { DataTable, DataTableActions } from '@/components/DataTable';
import BadgeStatus from './BadgeStatus.jsx';

export default function ListTable() {
  const navigate = useNavigate();
  const doFetch = useFetch();

  const columns = [
    {
      key: 'name',
      name: 'Name',
      sortable: true,
    },
    {
      key: 'slug',
      name: 'Slug',
      sortable: true,
    },
    {
      key: 'vendor.name',
      name: 'Vendor',
    },
    {
      key: 'start_date',
      name: 'Start Date',
      sortable: true,
      render(model) {
        if (!model.start_date) {
          return '-';
        }
        const dt = new Date(model.start_date);
        return isDate(dt) ? format(dt, config.formatDateTime) : '-';
      },
    },
    {
      key: 'end_date',
      name: 'End Date',
      sortable: true,
      render(model) {
        if (!model.end_date) {
          return '-';
        }
        const dt = new Date(model.end_date);
        return isDate(dt) ? format(dt, config.formatDateTime) : '-';
      },
    },
    {
      key: 'status',
      name: 'Status',
      sortable: true,
      render(model) {
        return <BadgeStatus status={model.status} />;
      },
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
                name: 'Edit entry',
                icon: 'fa-pencil',
                route: appRoute(`/campaigns/${model.id}/edit`),
              },
              {
                key: 'public',
                name: 'Campaign URL',
                icon: 'fa-link',
                route: publicRoute(`/campaigns/${model.slug}`),
                otherProps: { target: '_blank' },
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
    return doFetch('/v1/admin/campaigns', { params })
      .then((result) => {
        if (result.code !== 200) {
          throw new Error('Invalid response');
        }
        return result;
      });
  }, [doFetch]);

  const handleSelect = (data) => {
    navigate(appRoute(`/campaigns/${data.id}`));
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
