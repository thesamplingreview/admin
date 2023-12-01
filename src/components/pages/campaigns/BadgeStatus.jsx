import { useMemo } from 'react';
import Chip from '@mui/material/Chip';

export default function BadgeStatus({ status }) {
  const color = useMemo(() => {
    if (status === 'publish') {
      return 'success';
    }
    return undefined;
  }, [status]);

  return (
    <Chip label={status} color={color} size="small" />
  );
}
