import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { appRoute } from '@/helpers/route';
import { useOnce } from '@/helpers/hooks';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';
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
    vendor_id: model?.vendor_id || '',
  };
}

export default function FormCreate() {
  const navigate = useNavigate();
  const doFetch = useFetch();
  const pushToast = useToast();
  const options = useOptions();
  const endpointPost = useRoleEndpoint('/admins');

  const [loading, setLoading] = useState(false);
  const [validator, setValidator] = useState(null);
  const [input, setInput] = useState(genDefaultInput(options));

  // on vendor UI, options.roles won't include group info, so this flag will always return false
  const isVendorRole = useMemo(() => {
    const role = options.roles.find((d) => d.id === input.role_id);
    return role?.group === 'vendor';
  }, [options.roles, input.role_id]);

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
      const { code } = await doFetch(endpointPost, {
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
      // redirect
      navigate(appRoute('/admins'));
      // redirect?
    } catch (err) {
      if (err.response?.data?.code === 422) {
        setValidator(err.response.data.validator.reduce((acc, cur) => ({
          ...acc,
          [cur.field]: cur.msg,
        }), {}));
        pushToast('error', 'Invalid submission!');
      } else {
        // console.error(err);
        pushToast('error', 'Failed to update entry.');
      }
    }
    setLoading(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
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

      {options.roles?.length > 1 && (
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
      )}

      {isVendorRole && (
        <CFormControl label="Vendor">
          <VendorSelectInput
            name="vendor_id"
            value={input.vendor_id}
            required
            error={validator?.vendor_id}
            onChange={handleChange}
          />
        </CFormControl>
      )}

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

const VendorSelectInput = ({
  name,
  value,
  required,
  error,
  onChange,
}) => {
  const doFetch = useFetch();
  const endpointPut = useRoleEndpoint('/vendors');

  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [internalError, setInternalError] = useState('');

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const { code, data } = await doFetch(endpointPut);
      if (code !== 200) {
        throw new Error('Invalid API');
      }
      setOptions(data);
    } catch (err) {
      setInternalError(err.message);
    }
    setLoading(false);
  };

  useOnce(() => {
    fetchVendors();
  });

  return (
    <CSelect
      name={name}
      value={value}
      label="Select vendor"
      placeholder="Select"
      options={options}
      required={required}
      disabled={loading}
      error={internalError || error}
      onChange={onChange}
    />
  );
};
