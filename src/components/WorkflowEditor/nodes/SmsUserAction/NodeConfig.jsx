import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CSelect from '@/components/CSelect.jsx';

export default function NodeConfig({ config, onChange }) {
  const templates = useMemo(() => ([
    {
      id: 'template_1',
      name: 'Template 1',
    },
    {
      id: 'template_2',
      name: 'Template 2',
    },
  ]), []);

  return (
    <Box>
      <Box mb={2}>
        <Typography color="textSecondary" fontSize="0.875em" fontWeight="500" className="text-uppercase">
          Setting
        </Typography>
      </Box>
      <Box mb={2}>
        <CSelect
          options={templates}
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
