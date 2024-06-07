import { useState, useMemo } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useUpdated } from '@/helpers/hooks';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';
import { useOptions } from '@/contexts/hooks/module';
import { useToast } from '@/contexts/hooks/toast';
import CInput from '@/components/CInput.jsx';
import CSelect from '@/components/CSelect.jsx';
import CFormControl from '@/components/CFormControl.jsx';
import CLoadingButton from '@/components/CLoadingButton.jsx';

function genDefaultInput() {
  return {
    name: '',
    trigger: 'enrolment',
  };
}

export default function DialogAdd({
  open,
  appendData = {},
  onClose,
  onAdded,
}) {
  const doFetch = useFetch();
  const endpointPost = useRoleEndpoint('/workflows');
  const pushToast = useToast();
  const options = useOptions();

  const [saving, setSaving] = useState(false);
  const [input, setInput] = useState(genDefaultInput());
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
        ...genDefaultInput(),
        ...appendData,
      });
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      maxWidth="md"
      fullWidth
      onClose={onClose}
    >
      <DialogTitle>
        Add Workflow
      </DialogTitle>
      <DialogContent dividers>
        <CFormControl label="Workflow Name">
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
        <CFormControl label="Trigger">
          <CSelect
            options={options.workflow_triggers}
            name="trigger"
            value={input.trigger}
            label="Select trigger"
            required
            error={validator?.trigger}
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
