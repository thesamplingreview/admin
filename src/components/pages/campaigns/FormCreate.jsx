import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useFetch } from '@/contexts/hooks/auth';
import { useToast } from '@/contexts/hooks/toast';
import { toFormData } from '@/helpers/utils';
import { appRoute } from '@/helpers/route';
import CBox from '@/components/CBox.jsx';
import CInput from '@/components/CInput.jsx';
import CFormControl from '@/components/CFormControl.jsx';
import CLoadingButton from '@/components/CLoadingButton.jsx';

function genDefaultInput(model = null) {
  return {
    slug: model?.slug || '',
    name: model?.name || '',
  };
}

export default function FormCreate({ ...props }) {
  const navigate = useNavigate();
  const doFetch = useFetch();
  const pushToast = useToast();

  const [loading, setLoading] = useState(false);
  const [validator, setValidator] = useState(null);
  const [input, setInput] = useState(genDefaultInput());

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
      const { code, data } = await doFetch('/v1/admin/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: toFormData(formdata),
      });
      if (code !== 200) {
        throw new Error('Invalid API');
      }
      // push toast
      pushToast('success', 'Entry created!');
      // redirect
      navigate(appRoute(`/campaigns/${data.id}/edit`));
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
    <CBox
      {...props}
      component="form"
      title="New Entry"
      footer={(
        <Box display="flex" justifyContent="flex-end">
          <CLoadingButton
            type="submit"
            variant="contained"
            loading={loading}
          >
            Create & Next
          </CLoadingButton>
        </Box>
      )}
      onSubmit={handleSubmit}
    >
      <CFormControl
        label="Campaign Slug"
        note="This field will used to construct campaign's public URL and must be unique."
      >
        <CInput
          name="slug"
          value={input.slug}
          label="Enter slug"
          required
          helperText="URL friendly characters only"
          error={validator?.slug}
          onChange={handleChange}
        />
      </CFormControl>

      <CFormControl label="Campaign Name">
        <CInput
          name="name"
          value={input.name}
          label="Enter name"
          required
          error={validator?.name}
          onChange={handleChange}
        />
      </CFormControl>
    </CBox>
  );
}
