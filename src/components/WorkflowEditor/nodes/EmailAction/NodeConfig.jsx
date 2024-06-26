import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CInput from '@/components/CInput.jsx';
import CTextArea from '@/components/CTextArea.jsx';

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
          name="email"
          label="Enter email address"
          placeholder="example@email.com"
          InputLabelProps={{ shrink: true }}
          value={config.email || ''}
          onChange={onChange}
        />
      </Box>
      <Box mb={2}>
        <CTextArea
          name="message"
          label="Message"
          placeholder="Enter message"
          InputLabelProps={{ shrink: true }}
          value={config.message || ''}
          onChange={onChange}
        />
        {/* <CInput
          name="template"
          label="Select template"
          placeholder="Enter template ID"
          InputLabelProps={{ shrink: true }}
          value={config.template || ''}
          onChange={onChange}
        /> */}
      </Box>
    </Box>
  );
}
