import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CInput from '@/components/CInput.jsx';
import CSelect from '@/components/CSelect.jsx';

export default function NodeConfig({ options, config, onChange }) {
  return (
    <Box>
      <Box mb={2}>
        <Typography color="textSecondary" fontSize="0.875em" fontWeight="500" className="text-uppercase">
          Setting
        </Typography>
      </Box>
      <Box mb={2}>
        <CInput
          type="text"
          name="subject"
          label="Email Subject"
          placeholder=""
          InputLabelProps={{ shrink: true }}
          value={config.subject || ''}
          onChange={onChange}
        />
      </Box>
      <Box mb={2}>
        <CSelect
          options={options.mailTmpls}
          name="template"
          label="Email Template"
          placeholder="Select template"
          value={config.template || ''}
          onChange={onChange}
        />
      </Box>
    </Box>
  );
}
