import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import FasIcon from '@/components/FasIcon.jsx';

export default function DataTableActions({ actions }) {
  return (
    <Stack direction="row" gap={2} justifyContent="flex-end">
      {actions.map((action) => (
        <Tooltip
          key={action.key}
          title={action.name}
          placement="top"
        >
          <IconButton
            {...action.otherProps}
            component={action.route ? Link : 'span'}
            to={action.route || undefined}
            color={action.color || 'text.light'}
            sx={{ fontSize: '1.125em' }}
            onClick={action.onClick || undefined}
          >
            <FasIcon name={action.icon} />
          </IconButton>
        </Tooltip>
      ))}
    </Stack>
  );
}
