import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { useFetch } from '@/contexts/hooks/auth';
import { useModel } from '@/contexts/hooks/module';
import { useToast } from '@/contexts/hooks/toast';
import CInput from '@/components/CInput.jsx';
import CFormControl from '@/components/CFormControl.jsx';
import CLoadingButton from '@/components/CLoadingButton.jsx';

export default function FormPassword() {
  const doFetch = useFetch();
  const pushToast = useToast();
  const [model] = useModel();

  const defaultInput = useRef({
    password: '',
    passwordConfirm: '',
  });

  const [loading, setLoading] = useState(false);
  const [validator, setValidator] = useState(null);
  const [input, setInput] = useState(defaultInput.current);

  const handleChange = (e) => {
    setInput((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // FE compare password only
    if (input.password !== input.passwordConfirm) {
      setValidator({
        passwordConfirm: 'Password not match',
      });
      return;
    }

    setLoading(true);
    setValidator(null);
    try {
      const formdata = { ...input };
      const { code } = await doFetch(`/v1/admin/admins/${model.id}`, {
        method: 'PUT',
        data: formdata,
      });
      if (code !== 200) {
        throw new Error('Invalid API');
      }
      // reset
      setInput(defaultInput.current);
      // push toast
      pushToast('success', 'Password changed.');
      // redirect?
    } catch (err) {
      if (err.response?.data?.code === 422) {
        setValidator(err.response.data.validator.reduce((acc, cur) => ({
          ...acc,
          [cur.field]: cur.msg,
        }), {}));
        pushToast('error', 'Invalid submission.');
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
      <CFormControl label="New Password">
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

      <CFormControl label="Confirm Password">
        <CInput
          type="password"
          name="passwordConfirm"
          value={input.passwordConfirm}
          label="Re-enter password"
          required
          error={validator?.passwordConfirm}
          onChange={handleChange}
        />
      </CFormControl>

      <Box display="flex" justifyContent="flex-end" mt={3}>
        <CLoadingButton
          type="submit"
          variant="contained"
          loading={loading}
        >
          Update
        </CLoadingButton>
      </Box>
    </Box>
  );
}
