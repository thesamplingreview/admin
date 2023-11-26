import { useState } from 'react';
import Box from '@mui/material/Box';
import { useFetch } from '@/contexts/hooks/auth';
import { useOptions, useModel } from '@/contexts/hooks/module';
import { useToast } from '@/contexts/hooks/toast';
import CInput from '@/components/CInput.jsx';
import CSelect from '@/components/CSelect.jsx';
import CInputPhone from '@/components/CInputPhone.jsx';
import CFormControl from '@/components/CFormControl.jsx';
import CLoadingButton from '@/components/CLoadingButton.jsx';

function genDefaultInput(options, model = null) {
  return {
    email: model?.email || '',
    name: model?.name || '',
    contact: model?.contact || '',
    status: model?.status || options.statuses?.[0]?.id || '',
  };
}

export default function FormEdit() {
  const doFetch = useFetch();
  const options = useOptions();
  const pushToast = useToast();
  const [model, setModel] = useModel();

  const [loading, setLoading] = useState(false);
  const [validator, setValidator] = useState(null);
  const [input, setInput] = useState(genDefaultInput(options, model));

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
      const { code, data } = await doFetch(`/v1/admin/users/${model.id}`, {
        method: 'PUT',
        data: formdata,
      });
      if (code !== 200) {
        throw new Error('Invalid API');
      }
      // update cached
      setModel(data);
      setInput(genDefaultInput(options, data));
      // push toast
      pushToast('success', 'Entry updated.');
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
      <CFormControl label="Login Email">
        <CInput
          type="email"
          name="email"
          value={input.email}
          label="Email address"
          disabled
          helperText="Email can not be updated"
        />
      </CFormControl>

      <CFormControl label="User Name">
        <CInput
          name="name"
          value={input.name}
          label="Enter name"
          required
          error={validator?.name}
          onChange={handleChange}
        />
      </CFormControl>

      <CFormControl label="Contact Number">
        <CInputPhone
          name="contact"
          value={input.contact}
          prefixes={options.phone_prefixes?.map((d) => ({
            id: d.id,
            name: `${d.name} (${d.id})`,
          })) || []}
          label="Enter contact"
          error={validator?.contact}
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
