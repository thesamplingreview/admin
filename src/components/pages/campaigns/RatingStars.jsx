import { useMemo } from 'react';
import Stack from '@mui/material/Stack';
import FasIcon from '@/components/FasIcon.jsx';

export default function RatingStars({ rating }) {
  const content = useMemo(() => {
    const stars = [];
    for (let i = 0; i < rating; i += 1) {
      stars.push((
        <FasIcon name="fa-star" color="#fdcc0d" />
      ));
    }
    return stars;
  }, [rating]);

  return (
    <Stack direction="row" spacing={0.5}>
      {content}
    </Stack>
  );
}
