import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

export default function CFormControl({
  label,
  size = 9,
  children,
}) {
  return (
    <Grid container spacing={3} alignItems="flex-start" my={0}>
      <Grid xs={12} md={4} lg={3}>
        <Box mt={2}>
          <Typography variant="label">
            {label}
          </Typography>
        </Box>
      </Grid>
      <Grid md={8} lg={size}>
        {children}
      </Grid>
    </Grid>
  );
}
