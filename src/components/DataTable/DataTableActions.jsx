import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import FasIcon from '@/components/FasIcon.jsx';

export default function DataTableActions({ actions }) {
  return (
    <Stack direction="row" gap={2} justifyContent="flex-end">
      {actions.map((action) => (
        <IconButton
          key={action.key}
          component={action.route ? Link : 'span'}
          to={action.route || undefined}
          color={action.color || 'text.light'}
          title={action.name}
          sx={{ fontSize: '1.125em' }}
          onClick={action.onClick || undefined}
        >
          <FasIcon name={action.icon} />
        </IconButton>
      ))}
    </Stack>
  );
}
