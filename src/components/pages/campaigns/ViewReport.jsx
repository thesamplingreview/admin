import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';
import { useModel } from '@/contexts/hooks/module';
import { useOnce } from '@/helpers/hooks';
import { stringToColor } from '@/helpers/utils';
import CBox from '@/components/CBox.jsx';
import CLoader from '@/components/CLoader.jsx';
import CError from '@/components/CError.jsx';
import MChartHorizontalBar from '@/components/Charts/MChartHorizontalBar.jsx';

export default function ViewReport({ ...props }) {
  const doFetch = useFetch();
  const [model] = useModel();
  const endpointGet = useRoleEndpoint(`/campaigns/${model.id}/report/counts`);

  const [dataset, setDataset] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { code, data } = await doFetch(endpointGet);
      if (code !== 200) {
        throw new Error('API error');
      }
      setDataset(data || []);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useOnce(() => {
    fetchData();
  });

  return (
    <CBox title="Campaign Report" noPadding {...props}>
      {loading && (
        <CLoader />
      )}
      {!loading && error && (
        <CError message={error.message} />
      )}
      {!loading && !error && dataset.length === 0 && (
        <CError
          fasIcon="fa-triangle-exclamation"
          message="Campaign does not have any trackable field."
        />
      )}
      {!loading && !error && dataset.length > 0 && (
        <Box>
          {dataset.map((data) => (
            <DataItem key={data.id} data={data} />
          ))}
        </Box>
      )}
    </CBox>
  );
}

function DataItem({ data }) {
  const chartDs = useMemo(() => {
    return data.optionsCounts.map((d) => ({
      id: d.id,
      label: d.name,
      count: d.count || 0,
      color: stringToColor(data.name),
    }));
  }, [data]);

  return (
    <Box
      p={3}
      sx={{ borderBottom: '1px solid var(--border-500)' }}
    >
      <Grid container spacing={4}>
        <Grid xs={12} lg={3}>
          <Typography variant="h6">
            {data.name}
          </Typography>
        </Grid>
        <Grid xs={12} lg={9}>
          <MChartHorizontalBar dataset={chartDs} />
        </Grid>
      </Grid>
    </Box>
  );
}
