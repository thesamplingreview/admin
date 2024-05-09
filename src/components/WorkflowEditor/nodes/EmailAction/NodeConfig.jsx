import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CInput from '@/components/CInput.jsx';

export default function NodeConfig({ config, onChange }) {
  return (
    <Box>
      <Box mb={2}>
        <Typography color="textSecondary" fontSize="0.875em" fontWeight="500" className="text-uppercase">
          Setting
        </Typography>
      </Box>
      <Box mb={2}>
        <CInput
          type="email"
          name="to"
          label="Enter email address"
          placeholder="Placeholder"
          InputLabelProps={{ shrink: true }}
          value={config.to || ''}
          onChange={onChange}
        />
      </Box>
      <Box mb={2}>
        <CInput
          name="template"
          label="Select template"
          placeholder="Select"
          InputLabelProps={{ shrink: true }}
          value={config.template || ''}
          onChange={onChange}
        />
      </Box>
    </Box>
  );
}
