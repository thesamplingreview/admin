import { useState } from 'react';
import Box from '@mui/material/Box';
import { useFetch } from '@/contexts/hooks/auth';
import { useOptions, useModel } from '@/contexts/hooks/module';
import { useToast } from '@/contexts/hooks/toast';
import { toFormData } from '@/helpers/utils';
import CInput from '@/components/CInput.jsx';
import CTextArea from '@/components/CTextArea.jsx';
import CInputImage from '@/components/CInputImage.jsx';
import CFormControl from '@/components/CFormControl.jsx';
import CLoadingButton from '@/components/CLoadingButton.jsx';

function genDefaultInput(options, model = null) {
  return {
    name: model?.name || '',
    description: model?.description || '',
    cover: null,
    coverUrl: model?.cover_url || '',
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
      const { code, data } = await doFetch(`/v1/admin/forms/${model.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: toFormData(formdata),
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
      <CFormControl label="Form Name">
        <CInput
          name="name"
          value={input.name}
          label="Enter name"
          required
          error={validator?.name}
          onChange={handleChange}
        />
      </CFormControl>

      <CFormControl label="Cover Image">
        <CInputImage
          name="cover"
          value={input.cover}
          defaultValue={input.coverUrl}
          label="Browse image"
          maxSize={2}
          error={validator?.cover}
          onChange={handleChange}
        />
      </CFormControl>

      <CFormControl label="Description">
        <CTextArea
          name="description"
          value={input.description}
          label="Enter description"
          error={validator?.description}
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
