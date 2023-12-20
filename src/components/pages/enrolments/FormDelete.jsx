import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useFetch } from '@/contexts/hooks/auth';
import { useModel } from '@/contexts/hooks/module';
import { useToast } from '@/contexts/hooks/toast';
import { appRoute } from '@/helpers/route';
import CBox from '@/components/CBox.jsx';
import CInput from '@/components/CInput.jsx';
import CLoadingButton from '@/components/CLoadingButton.jsx';

export default function FormDelete({ ...props }) {
  const navigate = useNavigate();
  const doFetch = useFetch();
  const [model] = useModel();
  const pushToast = useToast();

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const isEnabled = useMemo(() => {
    return input.toUpperCase() === 'DELETE';
  }, [input]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const { code } = await doFetch(`/v1/admin/enrolments/${model.id}`, {
        method: 'DELETE',
      });
      if (code !== 200) {
        throw new Error('Invalid API');
      }
      // push toast
      pushToast('success', 'Entry deleted!');
      // redirect
      navigate(appRoute('/enrolments'));
    } catch (err) {
      pushToast('error', 'Failed to delete entry.');
    }
    setLoading(false);
  };

  return (
    <CBox
      {...props}
      component="form"
      title="Delete Entry"
      footer={(
        <Box display="flex" justifyContent="flex-end">
          <CLoadingButton
            type="submit"
            variant="contained"
            color="error"
            disabled={!isEnabled}
            loading={loading}
          >
            Confirm Delete
          </CLoadingButton>
        </Box>
      )}
      onSubmit={handleSubmit}
    >
      <Typography variant="h6">
        Are you certain you want to delete this entry?
      </Typography>
      <Typography variant="body1" mt={1}>
        This action is irreversible and will impact other records that are related to this entry.
      </Typography>
      <Typography variant="body1" mt={1}>
        USER MUST RE-ENROL AGAIN AFTER DELETED.
      </Typography>
      <Typography variant="body1" mt={3}>
        Enter <i>DELETE</i> to proceed.
      </Typography>

      <Grid container mt={2}>
        <Grid xs lg={6}>
          <CInput
            label=""
            placeholder="DELETE"
            value={input}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </CBox>
  );
}
