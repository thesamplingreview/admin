import { useState } from 'react';
import Box from '@mui/material/Box';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';
import { useToast } from '@/contexts/hooks/toast';
import { useOptions, useModel } from '@/contexts/hooks/module';
import { toFormData } from '@/helpers/utils';
import CBox from '@/components/CBox.jsx';
import CSelect from '@/components/CSelect.jsx';
import CFormControl from '@/components/CFormControl.jsx';
import CLoadingButton from '@/components/CLoadingButton.jsx';

function genDefaultInput(options, model = null) {
  return {
    status: model?.status || options.statuses[0].id || '',
    vendor_id: model?.vendor_id || '',
  };
}

export default function FormAdmin({ ...props }) {
  const doFetch = useFetch();
  const pushToast = useToast();
  const options = useOptions();
  const [model, setModel] = useModel();
  const endpointPut = useRoleEndpoint(`/campaigns/${model.id}`);

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
      const { code, data } = await doFetch(endpointPut, {
        method: 'PUT',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: toFormData(formdata),
      });
      if (code !== 200) {
        throw new Error('Invalid API');
      }
      // update cache
      setModel({ ...model, data });
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
      title="Change Settings"
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
        note="Only `publish` campaign will be visible to public"
        size={4}
      >
        <CSelect
          options={options.statuses}
          name="status"
          value={input.status}
          label="Select"
          error={validator?.status}
          onChange={handleChange}
        />
      </CFormControl>

      <CFormControl label="Vendor">
        <CSelect
          options={options.vendors}
          name="vendor_id"
          value={input.vendor_id}
          label="Select vendor"
          placeholder="Select"
          error={validator?.vendor_id}
          onChange={handleChange}
        />
      </CFormControl>
    </CBox>
  );
}
