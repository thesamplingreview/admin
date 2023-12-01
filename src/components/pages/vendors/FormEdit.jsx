import { useState } from 'react';
import Box from '@mui/material/Box';
import { useFetch } from '@/contexts/hooks/auth';
import { useToast } from '@/contexts/hooks/toast';
import { useModel } from '@/contexts/hooks/module';
import { toFormData } from '@/helpers/utils';
import CInput from '@/components/CInput.jsx';
import CTextArea from '@/components/CTextArea.jsx';
import CInputImage from '@/components/CInputImage.jsx';
import CFormControl from '@/components/CFormControl.jsx';
import CLoadingButton from '@/components/CLoadingButton.jsx';

function genDefaultInput(model = null) {
  return {
    name: model?.name || '',
    profile: model?.profile || '',
    logoUrl: model?.logo_url || '',
    logo: null,
  };
}

export default function FormEdit() {
  const doFetch = useFetch();
  const pushToast = useToast();
  const [model, setModel] = useModel();

  const [loading, setLoading] = useState(false);
  const [validator, setValidator] = useState(null);
  const [input, setInput] = useState(genDefaultInput(model));

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
      const { code, data } = await doFetch(`/v1/admin/vendors/${model.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: toFormData(formdata),
      });
      if (code !== 200) {
        throw new Error('Invalid API');
      }
      // update cache
      setModel(data);
      setInput(genDefaultInput(data));
      // push toast
      pushToast('success', 'Entry updated!');
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
      <CFormControl label="Vendor Name">
        <CInput
          name="name"
          value={input.name}
          label="Enter name"
          required
          error={validator?.name}
          onChange={handleChange}
        />
      </CFormControl>

      <CFormControl label="Vendor Logo">
        <CInputImage
          name="logo"
          value={input.logo}
          defaultValue={input.logoUrl}
          label="Browse image"
          maxSize={2}
          error={validator?.logo}
          onChange={handleChange}
        />
      </CFormControl>

      <CFormControl label="Vendor Profile">
        <CTextArea
          name="profile"
          value={input.profile}
          label="Write profile"
          error={validator?.profile}
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
