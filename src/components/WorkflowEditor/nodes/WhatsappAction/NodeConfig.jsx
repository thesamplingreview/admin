import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CInputPhone from '@/components/CInputPhone.jsx';
import CTextArea from '@/components/CTextArea.jsx';

export default function NodeConfig({ config, options, onChange }) {
  return (
    <Box>
      <Box mb={2}>
        <Typography color="textSecondary" fontSize="0.875em" fontWeight="500" className="text-uppercase">
          Setting
        </Typography>
      </Box>
      <Box mb={2}>
        <CInputPhone
          name="number"
          value={config.number}
          prefixes={options?.phone_prefixes?.map((d) => ({
            id: d.id,
            name: `${d.name} (${d.id})`,
          })) || []}
          label="WhatsApp number"
          onChange={onChange}
        />
      </Box>
      <Box mb={2}>
        <CTextArea
          name="message"
          label="Message"
          placeholder="Enter message to send"
          InputLabelProps={{ shrink: true }}
          value={config.message || ''}
          onChange={onChange}
        />
      </Box>
    </Box>
  );
}
