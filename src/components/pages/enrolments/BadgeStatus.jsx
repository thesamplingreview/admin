import { useMemo } from 'react';
import Chip from '@mui/material/Chip';

export default function BadgeStatus({ status }) {
  const color = useMemo(() => {
    if (status === 'complete') {
      return 'success';
    }
    return undefined;
  }, [status]);

  if (!status) {
    return '-';
  }
  return (
    <Chip label={status} color={color} size="small" />
  );
}
