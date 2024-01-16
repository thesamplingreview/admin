import { useCallback } from 'react';
import { isDate, format } from 'date-fns';
import Box from '@mui/material/Box';
import { useFetch } from '@/contexts/hooks/auth';
import { useModel } from '@/contexts/hooks/module';
import config from '@/config/app';
import CBox from '@/components/CBox.jsx';
import { DataTable } from '@/components/DataTable';
import RatingStars from './RatingStars.jsx';

export default function ViewReviews({ ...props }) {
  const doFetch = useFetch();
  const [model] = useModel();

  const columns = [
    {
      key: 'rating',
      name: 'Rating',
      sortable: true,
      width: '150',
      render(data) {
        return <RatingStars rating={data.rating} />;
      },
    },
    {
      key: 'review',
      name: 'Review',
      render(data) {
        return (
          <Box>
            <Box>{data.review}</Box>
            <Box fontSize="0.75em" color="text.light">
              {data.creator.name}
            </Box>
          </Box>
        );
      },
    },
    {
      key: 'created_at',
      name: 'Date',
      sortable: true,
      width: '200',
      render(data) {
        const dt = new Date(data.created_at);
        return isDate(dt) ? format(dt, config.formatDateTime) : '-';
      },
    },
  ];

  const fetchData = useCallback(({ page, sort }) => {
    const params = {
      campaign_id: model.id,
      page,
      sort,
    };
    return doFetch('/v1/admin/reviews', { params })
      .then((result) => {
        if (result.code !== 200) {
          throw new Error('Invalid response');
        }
        return result;
      });
  }, [doFetch, model.id]);

  return (
    <CBox {...props} noPadding>
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
        fetcher={fetchData}
      />
    </CBox>
  );
}
