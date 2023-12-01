import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { useFetch } from '@/contexts/hooks/auth';
import { useOptions } from '@/contexts/hooks/module';
import { appRoute } from '@/helpers/route';
// import CInput from '@/components/CInput.jsx';
import CSelect from '@/components/CSelect.jsx';
import CAvatar from '@/components/CAvatar.jsx';
import { DataTable, DataTableActions } from '@/components/DataTable';
import BadgeStatus from './BadgeStatus.jsx';

export default function ListTable() {
  const navigate = useNavigate();
  const doFetch = useFetch();

  const columns = [
    {
      key: 'image_url',
      name: 'Image',
      width: 80,
      render(model) {
        if (!model.image_url) {
          return '-';
        }
        return <CAvatar name={model.name} src={model.image_url} variant="rounded" sx={{ width: 60, height: 60 }} />;
      },
    },
    {
      key: 'name',
      name: 'Name',
      sortable: true,
    },
    {
      key: 'brand',
      name: 'Brand',
      sortable: true,
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
                key: 'view',
                name: 'View',
                icon: 'fa-file-lines',
                route: appRoute(`/products/${model.id}`),
              },
              {
                key: 'edit',
                name: 'edit',
                icon: 'fa-pencil',
                route: appRoute(`/products/${model.id}/edit`),
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
    return doFetch('/v1/admin/products', { params })
      .then((result) => {
        if (result.code !== 200) {
          throw new Error('Invalid response');
        }
        return result;
      });
  }, [doFetch]);

  const handleSelect = (data) => {
    navigate(appRoute(`/products/${data.id}`));
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
      filterable
      filtersBody={<FiltersBody />}
      fetcher={fetchData}
      onSelect={handleSelect}
    />
  );
}

const FiltersBody = () => {
  const options = useOptions();

  return (
    <Grid container spacing={4}>
      <Grid xs={12} md={6} lg={3}>
        <CSelect
          label="Role"
          name="role_id"
          defaultValue="" // convert to uncontrolled input
          // size="small"
          placeholder="Show all"
          options={options.roles || []}
        />
      </Grid>
      <Grid xs={12} md={6} lg={3}>
        <CSelect
          label="Status"
          name="status"
          defaultValue="" // convert to uncontrolled input
          placeholder="Show all"
          options={options.statuses || []}
        />
      </Grid>
    </Grid>
  );
};
