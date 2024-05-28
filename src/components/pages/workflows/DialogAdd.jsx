import { useState, useMemo } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useUpdated } from '@/helpers/hooks';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';
import { useToast } from '@/contexts/hooks/toast';
import CInput from '@/components/CInput.jsx';
import CFormControl from '@/components/CFormControl.jsx';
import CLoadingButton from '@/components/CLoadingButton.jsx';

const initInput = {
  name: '',
  trigger: 'enrolment',
};

export default function DialogAdd({
  open,
  appendData = {},
  onClose,
  onAdded,
}) {
  const doFetch = useFetch();
  const endpointPost = useRoleEndpoint('/workflows');
  const pushToast = useToast();

  const [saving, setSaving] = useState(false);
  const [input, setInput] = useState({});
  const [validator, setValidator] = useState(null);

  const isValid = useMemo(() => {
    if (!input.name) {
      return false;
    }
    const { name } = input;
    return name.length >= 3 && name.length <= 50;
  }, [input]);

  const handleChange = (e) => {
    setInput((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setValidator(null);
    try {
      const formdata = { ...input };
      const { code, data } = await doFetch(endpointPost, {
        method: 'POST',
        data: formdata,
      });
      if (code !== 200) {
        throw new Error('Invalid API');
      }
      onAdded(data);
      // push toast
      pushToast('success', 'Workflow created!');
    } catch (err) {
      if (err.response?.data?.code === 422) {
        setValidator(err.response.data.validator.reduce((acc, cur) => ({
          ...acc,
          [cur.field]: cur.msg,
        }), {}));
        pushToast('error', 'Invalid submission!');
      } else {
        pushToast('error', 'Failed to update.');
      }
    }
    setSaving(false);
  };

  useUpdated(() => {
    if (open) {
      setInput({
        ...initInput,
        ...appendData,
      });
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      onClose={onClose}
    >
      <DialogTitle>
        Add Workflow
      </DialogTitle>
      <DialogContent dividers>
        <CFormControl label="Workflow Name" size={8}>
          <CInput
            name="name"
            value={input.name}
            label="Enter workflow name"
            helperText="Allow between 3-50 characters"
            required
            error={validator?.name}
            onChange={handleChange}
          />
        </CFormControl>
      </DialogContent>
      <DialogActions>
        <Button color="text" onClick={onClose}>
          Cancel
        </Button>
        <CLoadingButton
          color="primary"
          loading={saving}
          disabled={!isValid}
          onClick={handleSubmit}
        >
          Save
        </CLoadingButton>
      </DialogActions>
    </Dialog>
  );
}
