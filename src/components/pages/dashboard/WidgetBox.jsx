import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import CBox from '@/components/CBox.jsx';
import CLoader from '@/components/CLoader.jsx';
import FasIcon from '@/components/FasIcon.jsx';

export default function WidgetBox({
  title,
  actions,
  loading,
  error,
  height = 300,
  onRefetch,
  children,
}) {
  return (
    <CBox noPadding>
      <Box display="flex" alignItems="center" py={2} px={3}>
        <Typography variant="h6">
          {title}
        </Typography>
        <Box ml="auto">
          {actions}
        </Box>
      </Box>
      <Divider />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        overflow="auto"
        height={height}
      >
        {loading && (
          <Box textAlign="center">
            <CLoader />
            <Typography variant="body2" color="text.light">
              Fetching data...
            </Typography>
          </Box>
        )}
        {!loading && error && (
          <Box textAlign="center">
            <Box fontSize="2rem" color="text.light" mb={1}>
              <FasIcon name="fa-triangle-exclamation" />
            </Box>
            <Typography variant="body2" color="text.light" mb={1}>
              {error.message}
            </Typography>
            <Button size="small" onClick={onRefetch}>
              Reload
            </Button>
          </Box>
        )}
        {!loading && !error && children}
      </Box>
    </CBox>
  );
}
