import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CInput from '@/components/CInput.jsx';

export default function NodeConfig({ onChange }) {
  return (
    <Box>
      <Box mb={2}>
        <Typography color="textSecondary" fontSize="0.875em" fontWeight="500" className="text-uppercase">
          Setting
        </Typography>
      </Box>
      <Box mb={2}>
        <CInput
          name="input"
          label="Enter value"
          placeholder="Placeholder"
          InputLabelProps={{ shrink: true }}
          value=''
          onChange={onChange}
        />
      </Box>
    </Box>
  );
}
