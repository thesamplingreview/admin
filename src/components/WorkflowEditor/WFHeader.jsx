import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNodes } from './hooks';

export default function WFHeader() {
  const [nodes] = useNodes();

  const handleSave = () => {
    console.log(nodes);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bgcolor="#fff"
      borderBottom="1px solid var(--border-500)"
      py={2}
      px={3}
      sx={{
        position: 'sticky',
        zIndex: 5,
        top: 0,
      }}
    >
      <Typography variant="h6">
        Workflow Name Goes here
      </Typography>
      <Button variant="contained" onClick={handleSave}>
        Save
      </Button>
    </Box>
  );
}
