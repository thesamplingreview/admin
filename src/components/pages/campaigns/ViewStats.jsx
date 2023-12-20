import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { useFetch } from '@/contexts/hooks/auth';
import { useOnce } from '@/helpers/hooks';
import CBox from '@/components/CBox.jsx';
import CLoader from '@/components/CLoader.jsx';
import CError from '@/components/CError.jsx';
import CStatControl from '@/components/CStatControl.jsx';

export default function ViewStats({ modelId, ...props }) {
  const doFetch = useFetch();

  const [dataset, setDataset] = useState({
    view_count: 0,
    enrolment_count: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await doFetch(`/v1/admin/campaigns/${modelId}/report/stats`);
      if (data) {
        setDataset({
          view_count: 0,
          enrolment_count: data.enrolments,
        });
      }
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useOnce(() => {
    fetchData();
  });

  return (
    <CBox title="Stats" {...props}>
      {loading && (
        <CLoader />
      )}
      {!loading && error && (
        <CError message={error.message} />
      )}
      {!loading && !error && (
        <Grid container spacing={3}>
          <Grid xs={3}>
            <CStatControl label="Total Views" value={dataset.view_count} />
          </Grid>
          <Grid xs={3}>
            <CStatControl label="Total Enrolments" value={dataset.enrolment_count} />
          </Grid>
        </Grid>
      )}
    </CBox>
  );
}
