import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import FasIcon from './FasIcon.jsx';

export default function CFormControl({
  label,
  size = 9,
  note,
  labelColProps,
  inputColProps,
  children,
}) {
  return (
    <Grid container spacing={3} alignItems="flex-start" my={0}>
      <Grid xs={12} md={4} lg={3} {...labelColProps}>
        <Box display="inline-flex" alignItems="center" mt={2}>
          <Typography variant="label">
            {label}
          </Typography>
          {note && (
            <Tooltip title={note} placement="right" arrow>
              <Box>
                <FasIcon name="fa-circle-info" color="text.light" ml={1} />
              </Box>
            </Tooltip>
          )}
        </Box>
      </Grid>
      <Grid md={8} lg={size} {...inputColProps}>
        {children}
      </Grid>
    </Grid>
  );
}
