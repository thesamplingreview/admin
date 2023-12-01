import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useModel } from '@/contexts/hooks/module';
import CDisplayControl from '@/components/CDisplayControl.jsx';
import BadgeStatus from './BadgeStatus.jsx';

export default function ViewDetail() {
  const [model] = useModel();

  return (
    <>
      <Typography variant="h5">
        Detail
      </Typography>

      <Box my={3}>
        <Divider />
      </Box>

      <CDisplayControl
        label="Email Address"
        value={model.email}
      />
      <CDisplayControl
        label="Name"
        value={model.name}
      />
      <CDisplayControl
        label="Contact Number"
        value={model.contact}
      />
      <CDisplayControl label="Status">
        <BadgeStatus status={model.status} />
      </CDisplayControl>
      {/*<CDisplayControl
        label="Last Login"
        type="datetime"
        value={model.updated_at}
      />*/}
      <CDisplayControl
        label="Last Update"
        type="datetime"
        value={model.updated_at}
      />
      <CDisplayControl
        label="Created Date"
        type="datetime"
        value={model.created_at}
      />
    </>
  );
}
