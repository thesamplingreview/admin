import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import Chip from '@mui/material/Chip';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';
import { useOptions } from '@/contexts/hooks/module';
import { appRoute } from '@/helpers/route';
import CSelect from '@/components/CSelect.jsx';
import { DataTable } from '@/components/DataTable';

export default function ListTable() {
  const navigate = useNavigate();
  const doFetch = useFetch();
  const endpointGet = useRoleEndpoint('/admins');

  const columns = [
    {
      key: 'name',
      name: 'Name',
      sortable: true,
    },
    {
      key: 'email',
      name: 'Email Address',
      sortable: true,
    },
    {
      key: 'status',
      name: 'Status',
      sortable: true,
      render(data) {
        let color = 'success';
        if (data.status === 'inactive') {
          color = 'error';
        }
        return (
          <Chip label={data.status} color={color} size="small" />
        );
      },
    },
    {
      key: 'user_role.name',
      name: 'Role',
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
    navigate(appRoute(`/admins/${data.id}`));
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
          options={options.roles}
        />
      </Grid>
      <Grid xs={12} md={6} lg={3}>
        <CSelect
          label="Status"
          name="status"
          defaultValue="" // convert to uncontrolled input
          placeholder="Show all"
          options={options.statuses}
        />
      </Grid>
    </Grid>
  );
};
