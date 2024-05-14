import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CInputPhone from '@/components/CInputPhone.jsx';
import CTextArea from '@/components/CTextArea.jsx';
// eslint-disable-next-line import/no-cycle
import { useOptions } from '../../hooks';

export default function NodeConfig({ config, onChange }) {
  const options = useOptions();

  return (
    <Box>
      <Box mb={2}>
        <Typography color="textSecondary" fontSize="0.875em" fontWeight="500" className="text-uppercase">
          Setting
        </Typography>
      </Box>
      <Box mb={2}>
        <CInputPhone
          name="to"
          value={config.to}
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
