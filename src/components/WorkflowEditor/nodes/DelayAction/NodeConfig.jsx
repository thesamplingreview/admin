import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CInputNumber from '@/components/CInputNumber.jsx';

export default function NodeConfig({ config, onChange }) {
  return (
    <Box>
      <Box mb={2}>
        <Typography color="textSecondary" fontSize="0.875em" fontWeight="500" className="text-uppercase">
          Setting
        </Typography>
      </Box>
      <Box mb={2}>
        <CInputNumber
          name="duration"
          label="Duration (in hours)"
          placeholder="Placeholder"
          min={0}
          max={100}
          InputLabelProps={{ shrink: true }}
          value={config.duration || ''}
          onChange={onChange}
        />
      </Box>
    </Box>
  );
}
