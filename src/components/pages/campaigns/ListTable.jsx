import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { isDate, format } from 'date-fns';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Tooltip from '@mui/material/Tooltip';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';
import { useOptions } from '@/contexts/hooks/module';
import { appRoute } from '@/helpers/route';
import config from '@/config/app';
import CBox from '@/components/CBox.jsx';
import CInput from '@/components/CInput.jsx';
import CSelect from '@/components/CSelect.jsx';
import FasIcon from '@/components/FasIcon.jsx';
import { DataTable, useInitTableData } from '@/components/DataTable';
import BadgeStatus from './BadgeStatus.jsx';

export default function ListTable({ ...props }) {
  const navigate = useNavigate();
  const doFetch = useFetch();
  const endpointGet = useRoleEndpoint('/campaigns');
  const initTableData = useInitTableData();

  const columns = [
    {
      key: 'name',
      name: 'Name',
      sortable: true,
      render(model) {
        return (
          <>
            {model.name || '-'}
            {!(model.form_id && model.review_type) && (
              <Tooltip title="This campaign has incomplete setup" placement="right" arrow>
                <Box display="inline" ml={1}>
                  <FasIcon name="fa-triangle-exclamation" color="#ffb822" />
                </Box>
              </Tooltip>
            )}
          </>
        );
      },
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
    navigate(appRoute(`/campaigns/${data.id}`));
  };

  return (
    <CBox {...props} noPadding>
      <DataTable
        key={initTableData.key}
        columns={columns}
        initData={initTableData}
        dataProps={{
          data: 'data',
          total: 'meta.total',
        }}
        selectable
        filterable
        alterHistory
        filtersBody={<FiltersBody />}
        fetcher={fetchData}
        onSelect={handleSelect}
      />
    </CBox>
  );
}

const FiltersBody = () => {
  const options = useOptions();
  const [searchParams] = useSearchParams();

  return (
    <Grid container spacing={4}>
      <Grid xs={12} md={6} lg={3}>
        <CSelect
          label="Type"
          name="state"
          defaultValue={searchParams.get('state') || ''} // convert to uncontrolled input
          // size="small"
          placeholder="Show all"
          options={options.states || []}
        />
      </Grid>
      <Grid xs={12} md={6} lg={3}>
        <CSelect
          label="Status"
          name="status"
          defaultValue={searchParams.get('status') || ''}
          placeholder="Show all"
          options={options.statuses || []}
        />
      </Grid>
      <Grid xs={12} md={6} lg={3}>
        <CInput
          label="Campaign name"
          name="name"
          placeholder="Search name"
          defaultValue={searchParams.get('name') || ''}
        />
      </Grid>
    </Grid>
  );
};
