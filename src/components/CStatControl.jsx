import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { formatNumber, formatNumberGroup } from '@/helpers/utils';

export default function CStatControl({
  label,
  value = '',
  ...props
}) {
  return (
    <Stack {...props}>
      <Typography variant="caption">
        {label}
      </Typography>
      <Box>
        <Tooltip title={formatNumber(value)} placement="bottom">
          <Typography component="span" variant="h1" fontWeight="600">
            {formatNumberGroup(value)}
          </Typography>
        </Tooltip>
      </Box>
    </Stack>
  );
}
