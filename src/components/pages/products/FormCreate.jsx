import { useState } from 'react';
import Box from '@mui/material/Box';
import { useFetch } from '@/contexts/hooks/auth';
import { useOptions } from '@/contexts/hooks/module';
import { useToast } from '@/contexts/hooks/toast';
import { toFormData } from '@/helpers/utils';
import CInput from '@/components/CInput.jsx';
import CTextArea from '@/components/CTextArea.jsx';
import CSelect from '@/components/CSelect.jsx';
import CInputImage from '@/components/CInputImage.jsx';
import CFormControl from '@/components/CFormControl.jsx';
import CLoadingButton from '@/components/CLoadingButton.jsx';

function genDefaultInput(options, model = null) {
  return {
    name: model?.name || '',
    brand: model?.brand || '',
    description: model?.description || '',
    image: null,
    imageUrl: model?.image_url || '',
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
      const { code } = await doFetch('/v1/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: toFormData(formdata),
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
      <CFormControl label="Product Name">
        <CInput
          name="name"
          value={input.name}
          label="Enter name"
          required
          error={validator?.name}
          onChange={handleChange}
        />
      </CFormControl>

      <CFormControl label="Product Image">
        <CInputImage
          name="image"
          value={input.image}
          label="Browse image"
          maxSize={2}
          error={validator?.image}
          onChange={handleChange}
        />
      </CFormControl>

      <CFormControl label="Brand">
        <CInput
          name="brand"
          value={input.brand}
          label="Brand name"
          required
          error={validator?.brand}
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
