import { useState } from 'react';
import Box from '@mui/material/Box';
import { useFetch } from '@/contexts/hooks/auth';
import { useOptions } from '@/contexts/hooks/module';
import { useToast } from '@/contexts/hooks/toast';
import CInput from '@/components/CInput.jsx';
import CSelect from '@/components/CSelect.jsx';
import CFormControl from '@/components/CFormControl.jsx';
import CLoadingButton from '@/components/CLoadingButton.jsx';

function genDefaultInput(options, model = null) {
  return {
    email: model?.email || '',
    password: '',
    name: model?.name || '',
    role_id: model?.role_id || options.roles?.[0]?.id || '',
    status: model?.status || options.statuses?.[0]?.id || '',
  };
}

export default function FormCreate() {
  const doFetch = useFetch();
  const pushToast = useToast();
  const options = useOptions();

  const [loading, setLoading] = useState(false);
  const [validator, setValidator] = useState(null);
  const [input, setInput] = useState(genDefaultInput(options));

  const handleChange = (e) => {
    setInput((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setValidator(null);
    try {
      const formdata = { ...input };
      const { code } = await doFetch('/v1/admin/admins', {
        method: 'POST',
        data: formdata,
      });
      if (code !== 200) {
        throw new Error('Invalid API');
      }
      // reset
      setInput(genDefaultInput(options));
      // push toast
      pushToast('success', 'Entry created!');
      // redirect?
    } catch (err) {
      if (err.response?.data?.code === 422) {
        setValidator(err.response.data.validator.reduce((acc, cur) => ({
          ...acc,
          [cur.field]: cur.msg,
        }), {}));
        pushToast('error', 'Invalid submission!');
      } else {
        // eslint-disable-next-line no-console
        console.error(err);
        pushToast('error', 'Failed to update entry.');
      }
    }
    setLoading(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <CFormControl label="Login Email">
        <CInput
          type="email"
          name="email"
          value={input.email}
          label="Email address"
          required
          error={validator?.email}
          onChange={handleChange}
        />
      </CFormControl>

      <CFormControl label="Login Password">
        <CInput
          type="password"
          name="password"
          value={input.password}
          label="Enter password"
          required
          error={validator?.password}
          onChange={handleChange}
        />
      </CFormControl>

      <CFormControl label="Admin Name">
        <CInput
          name="name"
          value={input.name}
          label="Enter name"
          required
          error={validator?.name}
          onChange={handleChange}
        />
      </CFormControl>

      <CFormControl label="Admin Role">
        <CSelect
          name="role_id"
          value={input.role_id}
          label="Select role"
          options={options.roles}
          required
          error={validator?.role_id}
          onChange={handleChange}
        />
      </CFormControl>

      <CFormControl label="Status">
        <CSelect
          name="status"
          value={input.status}
          label="Select status"
          options={options.statuses}
          required
          error={validator?.status}
          onChange={handleChange}
        />
      </CFormControl>

      <Box display="flex" justifyContent="flex-end" mt={3}>
        <CLoadingButton
          type="submit"
          variant="contained"
          loading={loading}
        >
          Save
        </CLoadingButton>
      </Box>
    </Box>
  );
}
