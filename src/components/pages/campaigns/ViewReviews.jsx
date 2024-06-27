import { useCallback } from 'react';
import { isDate, format } from 'date-fns';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';
import { useModel } from '@/contexts/hooks/module';
import config from '@/config/app';
import CBox from '@/components/CBox.jsx';
import FbGallery from '@/components/FancyBox/FbGallery.jsx';
import FasIcon from '@/components/FasIcon.jsx';
import CCsvButton from '@/components/CCsvButton.jsx';
import { DataTable } from '@/components/DataTable';
import RatingStars from './RatingStars.jsx';

export default function ViewReviews({ ...props }) {
  const doFetch = useFetch();
  const [model] = useModel();
  const endpointGet = useRoleEndpoint('/reviews');

  const getFileType = (url) => {
    const urlSegs = url.split('.');
    const ext = urlSegs[urlSegs.length - 1];
    // images
    if (['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
      return 'image';
    }
    // video
    if (['mp4', 'mov', '3gp'].includes(ext)) {
      return 'video';
    }
    return '';
  };

  const columns = [
    {
      key: 'rating',
      name: 'Rating',
      sortable: true,
      width: '150',
      valign: 'top',
      render(data) {
        return <RatingStars rating={data.rating} />;
      },
    },
    {
      key: 'user',
      name: 'User',
      width: '150',
      valign: 'top',
      render(data) {
        if (!data.creator) {
          return '-';
        }
        return (
          <Box width="150px">
            <Box className="truncate">{data.creator.name}</Box>
            <Box className="truncate" fontSize="0.75em" color="text.light">
              {data.creator.email}
            </Box>
          </Box>
        );
      },
    },
    {
      key: 'review',
      name: 'Review',
      valign: 'top',
      render(data) {
        return (
          <Box minWidth="1px">
            <Box dangerouslySetInnerHTML={{ __html: data.review.replace(/\n/g, '<br>') }} />
            <FbGallery
              dataset={data.uploads?.map((d) => ({
                src: d.url,
                type: getFileType(d.url),
              })) || []}
              size="80px"
              gap={1}
              mt={2}
            />
          </Box>
        );
      },
    },
    {
      key: 'created_at',
      name: 'Date',
      sortable: true,
      width: '200',
      valign: 'top',
      render(data) {
        const dt = new Date(data.created_at);
        return isDate(dt) ? format(dt, config.formatDateTime) : '-';
      },
    },
  ];

  const fetchData = useCallback(({ page, perPage, sort }) => {
    const params = {
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
          <FasIcon name="fa-comments" mr={2} />
          User Reviews
        </Typography>
        <CCsvButton
          endpoint={useRoleEndpoint('/reviews/export')}
          filename="campaign-reviews.csv"
          filter={{ campaign_id: model.id }}
        />
      </Box>
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
        fetcher={fetchData}
      />
    </CBox>
  );
}
