import { useState, useMemo } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CInput from '@/components/CInput.jsx';
import CSelect from '@/components/CSelect.jsx';
import CLoadingButton from '@/components/CLoadingButton.jsx';

export default function NodeConfig({ config, onChange, onSet }) {
  const [loading, setLoading] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const authTypes = useMemo(() => [
    {
      id: '',
      name: 'No Auth',
    },
    {
      id: 'basic_auth',
      name: 'Basic Auth',
    },
    {
      id: 'bearer_token',
      name: 'Bearer Token',
    },
    {
      id: 'api_key',
      name: 'API Key',
    },
  ], []);
  const fields = useMemo(() => {
    if (config.auth_type === 'bearer_token') {
      return ['token'];
    }
    if (config.auth_type === 'basic_auth') {
      return ['username', 'password'];
    }
    if (config.auth_type === 'api_key') {
      return ['key', 'value'];
    }
    return [];
  }, [config.auth_type]);

  const handleChangeAuthType = (e) => {
    onSet({
      auth_type: e.target.value,
      token: '',
      username: '',
      password: '',
      key: '',
      value: '',
    });
  };

  const handleTestSuccess = (msg) => {
    setTestResult({
      type: 'success',
      message: msg,
    });
  };

  const handleTestError = (msg) => {
    setTestResult({
      type: 'error',
      message: msg,
    });
  };

  const handleTestCall = async () => {
    if (!config.endpoint) {
      handleTestError('Missing Endpoint');
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
    };
    if (config.auth_type === 'basic_auth') {
      const credentials = btoa(`${config.username}:${config.password}`);
      headers.Authorization = `Basic ${credentials}`;
    }
    if (config.auth_type === 'bearer_token') {
      headers.Authorization = `Bearer ${config.token}`;
    }
    if (config.auth_type === 'api_key') {
      headers[config.key] = config.value;
    }

    setLoading(true);
    setTestResult(null);
    try {
      const response = await fetch(config.endpoint, {
        method: 'GET',
        headers,
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      handleTestSuccess('Reponse status: 200');
    } catch (err) {
      handleTestError(err.message);
    }
    setLoading(false);
  };

  return (
    <Box>
      <Box mb={2}>
        <Typography color="textSecondary" fontSize="0.875em" fontWeight="500" className="text-uppercase">
          Setting
        </Typography>
      </Box>
      <Box mb={2}>
        <CInput
          type="url"
          name="endpoint"
          label="Endpoint"
          placeholder="Enter endpoint URL"
          InputLabelProps={{ shrink: true }}
          value={config.endpoint || ''}
          onChange={onChange}
        />
      </Box>
      <Box mb={2}>
        <Typography color="textSecondary" fontSize="0.875em" fontWeight="500" className="text-uppercase">
          Auth
        </Typography>
      </Box>
      <Box mb={2}>
        <CSelect
          name="auth_type"
          // label="Auth Type"
          options={authTypes}
          displayEmpty
          value={config.auth_type || ''}
          onChange={handleChangeAuthType}
        />
      </Box>
      {fields.includes('token') && (
        <Box mb={2}>
          <CInput
            name="token"
            label="Token"
            placeholder="Enter bearer token"
            value={config.token || ''}
            onChange={onChange}
          />
        </Box>
      )}
      {fields.includes('username') && (
        <Box mb={2}>
          <CInput
            name="username"
            label="Username"
            placeholder="Enter username"
            value={config.username || ''}
            onChange={onChange}
          />
        </Box>
      )}
      {fields.includes('password') && (
        <Box mb={2}>
          <CInput
            type="password"
            name="password"
            label="Password"
            placeholder="Enter password"
            value={config.password || ''}
            onChange={onChange}
          />
        </Box>
      )}
      {fields.includes('key') && (
        <Box mb={2}>
          <CInput
            name="key"
            label="Key"
            placeholder="Enter key"
            value={config.key || ''}
            onChange={onChange}
          />
        </Box>
      )}
      {fields.includes('value') && (
        <Box mb={2}>
          <CInput
            name="value"
            label="Value"
            placeholder="Enter value"
            value={config.value || ''}
            onChange={onChange}
          />
        </Box>
      )}
      <Box mb={2}>
        <Typography color="textSecondary" fontSize="0.875em" fontWeight="500" className="text-uppercase">
          Test Connection
        </Typography>
      </Box>
      <Box mb={2}>
        <CLoadingButton
          variant="contained"
          loading={loading}
          fullWidth
          onClick={handleTestCall}
        >
          Test Connection
        </CLoadingButton>
      </Box>
      {testResult && (
        <Alert severity={testResult.type}>
          {testResult.message}
        </Alert>
      )}
    </Box>
  );
}
