import { useState } from 'react';
import Box from '@mui/material/Box';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';
import { useToast } from '@/contexts/hooks/toast';
import { useOptions, useModel } from '@/contexts/hooks/module';
import CBox from '@/components/CBox.jsx';
import CSelect from '@/components/CSelect.jsx';
import CFormControl from '@/components/CFormControl.jsx';
import CLoadingButton from '@/components/CLoadingButton.jsx';

function genDefaultInput(options, model = null) {
  return {
    status: model?.status || '',
  };
}

export default function FormAdmin({ ...props }) {
  const doFetch = useFetch();
  const pushToast = useToast();
  const options = useOptions();
  const [model, setModel] = useModel();
  const endpointPost = useRoleEndpoint(`/enrolments/${model.id}`);

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
      const { code, data } = await doFetch(endpointPost, {
        method: 'PUT',
        data: formdata,
      });
      if (code !== 200) {
        throw new Error('Invalid API');
      }
      // update cache
      setModel({
        ...model,
        ...data,
      });
      setInput(genDefaultInput(options, data));
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
    <CBox
      {...props}
      component="form"
      title="Admin Setting"
      footer={(
        <Box display="flex" justifyContent="flex-end">
          <CLoadingButton
            type="submit"
            variant="contained"
            loading={loading}
          >
            Save
          </CLoadingButton>
        </Box>
      )}
      onSubmit={handleSubmit}
    >
      <CFormControl
        label="Status"
        size={4}
        note="Rejected enrollments will not be included in the campaign's quota."
      >
        <CSelect
          options={options.statuses}
          name="status"
          value={input.status}
          label="Select"
          placeholder="Select"
          error={validator?.status}
          onChange={handleChange}
        />
      </CFormControl>
    </CBox>
  );
}
