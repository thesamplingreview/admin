import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { isDate, format } from 'date-fns';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';
import { useModel, useOptions } from '@/contexts/hooks/module';
import { appRoute } from '@/helpers/route';
import config from '@/config/app';
import CBox from '@/components/CBox.jsx';
import CInput from '@/components/CInput.jsx';
import CSelect from '@/components/CSelect.jsx';
import FasIcon from '@/components/FasIcon.jsx';
import CCsvButton from '@/components/CCsvButton.jsx';
import { DataTable, useInitTableData } from '@/components/DataTable';
import BadgeStatus from '../enrolments/BadgeStatus.jsx';

export default function ViewEnrolments({ ...props }) {
  const navigate = useNavigate();
  const doFetch = useFetch();
  const [model] = useModel();
  const endpointGet = useRoleEndpoint('/enrolments');
  const initTableData = useInitTableData();

  const columns = [
    {
      key: 'user.name',
      name: 'User',
    },
    {
      key: 'user.email',
      name: 'Email',
    },
    {
      key: 'status',
      name: 'Status',
      sortable: true,
      render(data) {
        return <BadgeStatus status={data.status} />;
      },
    },
    {
      key: 'created_at',
      name: 'Date',
      sortable: true,
      render(data) {
        const dt = new Date(data.created_at);
        return isDate(dt) ? format(dt, config.formatDateTime) : '-';
      },
    },
  ];

  const fetchData = useCallback(({
    page, perPage, sort, filters,
  }) => {
    const params = {
      ...filters,
      campaign_id: model.id,
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
  }, [doFetch, model.id, endpointGet]);

  const handleSelect = (data) => {
    navigate(appRoute(`/enrolments/${data.id}`));
  };

  return (
    <CBox {...props} noPadding>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px solid var(--border-500)"
        p={3}
      >
        <Typography variant="h5">
          <FasIcon name="fa-user-check" mr={2} />
          Campaign Enrolments
        </Typography>
        <CCsvButton
          endpoint={useRoleEndpoint('/enrolments/export')}
          filename="campaign-enrolments.csv"
          filter={{ campaign_id: model.id }}
        />
      </Box>
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
  const [searchParams] = useSearchParams();
  const options = useOptions();

  return (
    <Grid container spacing={4}>
      <Grid xs={12} md={6} lg={3}>
        <CInput
          label="User name"
          name="user_name"
          placeholder="Search name"
          defaultValue={searchParams.get('user_name') || ''}
        />
      </Grid>
      <Grid xs={12} md={6} lg={3}>
        <CInput
          label="User email"
          name="user_email"
          placeholder="Search email"
          defaultValue={searchParams.get('user_email') || ''}
        />
      </Grid>
      <Grid xs={12} md={6} lg={3}>
        <CSelect
          label="Status"
          name="status"
          defaultValue={searchParams.get('status') || ''}
          placeholder="Show all"
          options={options.enrolment_statuses || []}
        />
      </Grid>
    </Grid>
  );
};
