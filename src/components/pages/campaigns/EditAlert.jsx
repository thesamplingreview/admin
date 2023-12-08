import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useModel } from '@/contexts/hooks/module';

export default function EditAlert() {
  const [model] = useModel();

  if (model.status !== 'publish') {
    return null;
  }
  return (
    <Box mb={3}>
      <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        You are editing PUBLISHED campaign right now.
      </Alert>
    </Box>
  );
}
