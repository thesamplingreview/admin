import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useOnce } from '@/helpers/hooks';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';
import { appRoute } from '@/helpers/route';
import WidgetBox from './WidgetBox.jsx';

export default function WidgetSignupChart() {
  const navigate = useNavigate();
  const doFetch = useFetch();
  const endpointGet = useRoleEndpoint('/enrolments');

  const [dataset, setDataset] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setError(null);
    setDataset([]);
    setLoading(true);
    try {
      const { data } = await doFetch(endpointGet, {
        params: {
          sort: '-created_at',
          per_page: 5,
        },
      });
      if (!data) {
        throw new Error('Failed to retrieve data.');
      }
      setDataset(data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  }, [doFetch, endpointGet]);

  const handleClick = (data) => {
    navigate(appRoute(`/enrolments/${data.id}`));
  };

  useOnce(() => {
    fetchData();
  });

  return (
    <WidgetBox
      title="Latest Enrolments"
      loading={loading}
      error={error}
      height={315}
      onRefetch={fetchData}
    >
      <Box height="100%" width="100%">
        {dataset.length > 0 && (
          <Table sx={{ fontSize: '0.875rem' }}>
            <TableHead>
              <TableRow sx={{
                bgcolor: 'var(--bg-500)',
                fontSize: '0.875em',
              }}>
                <TableCell sx={{ py: 1 }}>Campaign</TableCell>
                <TableCell align="right" sx={{ py: 1 }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataset.map((data) => (
                <TableRow
                  key={data.id}
                  hover
                  onClick={() => handleClick(data)}
                >
                  <TableCell>
                    {data.campaign?.name || '-'}
                  </TableCell>
                  <TableCell align="right">
                    {format(new Date(data.created_at), 'd/M/yyyy')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Box>
    </WidgetBox>
  );
}
