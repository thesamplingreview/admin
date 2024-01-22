import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useModel } from '@/contexts/hooks/module';

export default function EditAlert() {
  const [model] = useModel();

  if (model.campaigns?.length <= 0) {
    return null;
  }
  return (
    <Box mb={3}>
      <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        This form was used by <b>MULTIPLE</b> campaigns. <br />
        Any changes make will affect all linked campaigns.
      </Alert>
    </Box>
  );
}
