import { useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';
import { useToast } from '@/contexts/hooks/toast';
import CLoadingButton from '@/components/CLoadingButton.jsx';
import CConfirmAlert from '@/components/CConfirmAlert.jsx';

export default function TriggerButton({
  id,
  trigger,
  count,
  children,
  ...props
}) {
  const doFetch = useFetch();
  const endpointPut = useRoleEndpoint(`/campaign-workflow/${id}/trigger`);
  const pushToast = useToast();

  const [loading, setLoading] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsConfirm(false);
    setLoading(true);
    try {
      const { code, data } = await doFetch(endpointPut, {
        method: 'PUT',
      });
      if (code !== 200) {
        throw new Error('Invalid API');
      }
      pushToast('success', data);
    } catch (err) {
      if (err.response?.data?.code === 422) {
        const errMsg = err.response.data.error || 'Invalid trigger!';
        pushToast('error', errMsg);
      } else {
        pushToast('error', 'Failed to trigger.');
      }
    }
    setLoading(false);
  };

  return (
    <>
      <CLoadingButton
        {...props}
        loading={loading}
        onClick={() => setIsConfirm(true)}
      >
        {children}
      </CLoadingButton>

      <CConfirmAlert
        open={isConfirm}
        title="Confirm Your Action"
        txtConfirm="Continue"
        onCancel={() => setIsConfirm(false)}
        onConfirm={handleSubmit}
      >
        <Alert severity="error">
          <AlertTitle>Warning</AlertTitle>
          <Box mb={1}>
            Manually trigger of workflow will run the workflow tasks for all campaign users. <br />Action can not be undone!
          </Box>
          <Box fontWeight="700" textTransform="uppercase">
            {count} {trigger} USERS WILL GET AFFECTED
          </Box>
        </Alert>
      </CConfirmAlert>
    </>
  );
}
