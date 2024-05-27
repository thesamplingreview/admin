import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CSelect from '@/components/CSelect.jsx';
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
