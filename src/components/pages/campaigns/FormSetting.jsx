import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import { useFetch } from '@/contexts/hooks/auth';
import { useToast } from '@/contexts/hooks/toast';
import { useOptions, useModel } from '@/contexts/hooks/module';
import { toFormData } from '@/helpers/utils';
import CBox from '@/components/CBox.jsx';
import CSelect from '@/components/CSelect.jsx';
import CInput from '@/components/CInput.jsx';
import CInputMD from '@/components/CInputMD.jsx';
import CFormControl from '@/components/CFormControl.jsx';
import CLoadingButton from '@/components/CLoadingButton.jsx';

function genDefaultInput(options, model = null) {
  return {
    status: model?.status || options.statuses[0].id || '',
    vendor_id: model?.vendor_id || '',
    form_id: model?.form_id || '',
    review_type: model?.review_type || '',
    review_instruction: model?.review_instruction || '',
    review_cta: model?.review_cta || '',
  };
}

export default function FormSetting({ ...props }) {
  const doFetch = useFetch();
  const pushToast = useToast();
  const options = useOptions();
  const [model, setModel] = useModel();

  const [loading, setLoading] = useState(false);
  const [validator, setValidator] = useState(null);
  const [input, setInput] = useState(genDefaultInput(options, model));

  const reviewTypes = useMemo(() => {
    // change options naming
    return options.review_types.map((d) => ({
      id: d.id,
      name: d.id === 'form' ? 'Review Form' : d.name,
    }));
  }, [options.review_types]);

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
      const { code, data } = await doFetch(`/v1/admin/campaigns/${model.id}`, {
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

      <CFormControl
        label="Enrolment Form"
        note="Choose which enrolment form will be used by this campaign."
      >
        <CSelect
          options={options.forms}
          name="form_id"
          value={input.form_id}
          label="Select form"
          placeholder="Select"
          error={validator?.form_id}
          onChange={handleChange}
        />
      </CFormControl>

      <CFormControl
        label="Review Type"
        note="Define how can user review the sampling."
        size={4}
      >
        <CSelect
          options={reviewTypes}
          name="review_type"
          value={input.review_type}
          label="Select type"
          placeholder="Select"
          error={validator?.review_type}
          onChange={handleChange}
        />
      </CFormControl>

      {input.review_type === 'redirect' && (
        <>
          <CFormControl label="Redirect URL">
            <CInput
              name="review_cta"
              value={input.review_cta}
              placeholder="Enter full url"
              error={validator?.review_cta}
              onChange={handleChange}
            />
          </CFormControl>

          <CFormControl label="Review Instruction">
            <CInputMD
              name="review_instruction"
              value={input.review_instruction}
              placeholder="Enter instruction here"
              error={validator?.review_instruction}
              onChange={handleChange}
            />
          </CFormControl>
        </>
      )}
    </CBox>
  );
}
