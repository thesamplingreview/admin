import {
  useRef, useState, useEffect, useCallback,
} from 'react';
import { format, eachDayOfInterval, subDays } from 'date-fns';
import Box from '@mui/material/Box';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';
import ChartGraph from '@/components/Charts/ChartGraph.jsx';
import WidgetBox from './WidgetBox.jsx';
import InputDates from './InputDates.jsx';

export default function WidgetEnrolmentChart() {
  const doFetch = useFetch();
  const endpointGet = useRoleEndpoint('/report/enrolments');

  const [dates, setDates] = useState({
    start: subDays(new Date(), 30),
    end: new Date(),
  });
  const [dataset, setDataset] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const { data } = await doFetch(endpointGet, {
        params: {
          date_from: format(dates.start, 'yyyy-MM-dd'),
          date_to: format(dates.end, 'yyyy-MM-dd'),
        },
      });
      if (!data) {
        throw new Error('Failed to retrieve data.');
      }
      const daysValue = data.reduce((acc, cur) => ({
        ...acc,
        [cur.day]: cur.count,
      }), {});
      const days = eachDayOfInterval(dates).map((date) => {
        const day = format(date, 'yyyy-MM-dd');
        return {
          key: day,
          name: day,
          count: daysValue[day] || 0,
        };
      });
      // console.log(days);
      setDataset(days);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  }, [doFetch, dates, endpointGet]);

  const timer = useRef(null);
  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(fetchData, 500);
    return () => clearTimeout(timer.current);
  }, [fetchData]);

  return (
    <WidgetBox
      title="Campaign Enrolments"
      loading={loading}
      error={error}
      actions={<InputDates value={dates} onChange={setDates} />}
      onRefetch={fetchData}
    >
      <Box height="100%" width="100%" px={3} py={2}>
        {dataset.length > 0 && (
          <ChartGraph
            dataset={dataset}
            height="100%"
            options={{
              scales: {
                y: {
                  min: 0,
                  ticks: {
                    stepSize: 1,
                  },
                },
                x: {
                  ticks: {
                    font: {
                      size: 11,
                    },
                  },
                },
              },
            }}
          />
        )}
      </Box>
    </WidgetBox>
  );
}
