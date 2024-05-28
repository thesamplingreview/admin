import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';
import { useToast } from '@/contexts/hooks/toast';
import CLoadingButton from '@/components/CLoadingButton.jsx';
import CConfirmAlert from '@/components/CConfirmAlert.jsx';

export default function TriggerButton({
  id,
  name,
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
        const errMsg = err.response.data.error || 'Invalid submission!';
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
        <Typography variant="body1" sx={{ mb: 1 }}>
          This will trigger <i>{name}</i> workflow&apos;s actions to
        </Typography>
        <Typography variant="body1" fontWeight={500}>
          ALL ENROLMENTS of campaign.
        </Typography>
      </CConfirmAlert>
    </>
  );
}
