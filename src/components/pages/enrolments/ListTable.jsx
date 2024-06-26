import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { isDate, format } from 'date-fns';
import Grid from '@mui/material/Unstable_Grid2';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';
import { useOptions } from '@/contexts/hooks/module';
import { appRoute } from '@/helpers/route';
import config from '@/config/app';
import CBox from '@/components/CBox.jsx';
import CInput from '@/components/CInput.jsx';
import CSelect from '@/components/CSelect.jsx';
import { DataTable } from '@/components/DataTable';
import BadgeStatus from './BadgeStatus.jsx';

export default function ListTable({ ...props }) {
  const navigate = useNavigate();
  const doFetch = useFetch();
  const endpointGet = useRoleEndpoint('/enrolments');

  const columns = [
    {
      key: 'user.name',
      name: 'Name',
    },
    {
      key: 'user.email',
      name: 'Email',
    },
    {
      key: 'campaign.name',
      name: 'Campaign',
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
      key: 'created_at',
      name: 'Enrolment Date',
      sortable: true,
      render(model) {
        const dt = new Date(model.created_at);
        return isDate(dt) ? format(dt, config.formatDateTime) : '-';
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
    navigate(appRoute(`/enrolments/${data.id}`));
  };

  return (
    <CBox {...props} noPadding>
      <DataTable
        columns={columns}
        initData={{
          page: 1,
          perPage: 20,
          sort: '-created_at',
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
    </CBox>
  );
}

const FiltersBody = () => {
  const options = useOptions();

  return (
    <Grid container spacing={4}>
      <Grid xs={12} md={6} lg={3}>
        <CSelect
          label="Campaign"
          name="campaign_id"
          defaultValue="" // convert to uncontrolled input
          // size="small"
          placeholder="Show all"
          options={options.campaigns || []}
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
      <Grid xs={12} md={6} lg={3}>
        <CInput
          type="date"
          label="From Date"
          name="date_from"
          placeholder="Select date"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid xs={12} md={6} lg={3}>
        <CInput
          type="date"
          label="To Date"
          name="date_to"
          placeholder="Select date"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );
};
