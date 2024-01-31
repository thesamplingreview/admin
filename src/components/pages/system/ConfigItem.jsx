import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

export default function ConfigItem({
  heading,
  desc,
  children,
}) {
  return (
    <Grid container>
      <Grid xs={12} md={7}>
        <Box p={3}>
          <Typography variant="h6" fontWeight="600" mb={1}>
            {heading}
          </Typography>
          {desc}
        </Box>
      </Grid>
      <Grid xs={12} md={5} sx={{ borderLeft: '1px solid var(--border-500)' }}>
        <Box p={3}>
          {children}
        </Box>
      </Grid>
    </Grid>
  );
}
