import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CInput from '@/components/CInput.jsx';
import CLoadingButton from '@/components/CLoadingButton.jsx';
import { useLogin } from '@/contexts/hooks/auth';
import { getFormData } from '@/helpers/utils';

export default function LoginForm({ disabled }) {
  const doLogin = useLogin();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = getFormData(e.target);

    setError(null);
    setLoading(true);
    try {
      await doLogin(input);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return (
    <Box
      component="form"
      textAlign="center"
      width="25rem"
      maxWidth="100%"
      mx="auto"
      p={4}
      onSubmit={handleSubmit}
    >
      <Box>
        <img
          src="/images/logo.png"
          alt="App name"
          width="60"
          height="60"
        />
      </Box>
      <Typography variant="h5">
        Admin Portal
      </Typography>
      <Typography variant="body1" color="text.light" mt={1}>
        Please login to proceed.
      </Typography>
      {error && (
        <Typography variant="body2" color="error.main" mt={1}>
          {error.message}
        </Typography>
      )}

      <Box mt={4}>
        <CInput
          type="email"
          name="email"
          label="Login Email"
          required
        />
      </Box>
      <Box mt={2}>
        <CInput
          type="password"
          name="password"
          label="Password"
          required
        />
      </Box>
      <Box mt={3} mb={3}>
        <CLoadingButton
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          loading={disabled || loading}
        >
          Login
        </CLoadingButton>
      </Box>
    </Box>
  );
}
