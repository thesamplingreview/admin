import { useState, useMemo } from 'react';
import { isDate, formatISO } from 'date-fns';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';
import { useToast } from '@/contexts/hooks/toast';
import { useOptions, useModel } from '@/contexts/hooks/module';
import { toFormData } from '@/helpers/utils';
import CBox from '@/components/CBox.jsx';
import CSelect from '@/components/CSelect.jsx';
import CInput from '@/components/CInput.jsx';
import CInputNumber from '@/components/CInputNumber.jsx';
import CInputMD from '@/components/CInputMD.jsx';
import CFormControl from '@/components/CFormControl.jsx';
import CLoadingButton from '@/components/CLoadingButton.jsx';

function genDefaultInput(options, model = null) {
  function dateParse(date) {
    if (!date) {
      return '';
    }
    const dt = new Date(date);
    return isDate(dt) ? formatISO(dt, { representation: 'date' }) : '';
  }

  return {
    slug: model?.slug || '',
    form_id: model?.form_id || '',
    review_type: model?.review_type || '',
    review_instruction: model?.review_instruction || '',
    review_cta: model?.review_cta || '',
    meta_title: model?.meta_title || '',
    meta_description: model?.meta_description || '',
    meta_tag: model?.meta_tag || '',
    start_date: dateParse(model?.start_date),
    end_date: dateParse(model?.end_date),
    quota: model?.quota !== undefined ? model.quota : '',
  };
}

export default function FormSetting({ ...props }) {
  const doFetch = useFetch();
  const pushToast = useToast();
  const options = useOptions();
  const [model, setModel] = useModel();
  const endpointPut = useRoleEndpoint(`/campaigns/${model.id}`);

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
      const { code, data } = await doFetch(endpointPut, {
        method: 'PUT',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: toFormData(formdata),
      });
      if (code !== 200) {
        throw new Error('Invalid API');
      }
      // update cache
      setModel((oldState) => ({
        ...oldState,
        ...data,
      }));
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
      {/* <CFormControl
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
      </CFormControl> */}

      <CFormControl label="Campaign Period">
        <Grid container spacing={2} columns={12} alignItems="center">
          <Grid xs={12} md>
            <CInput
              type="date"
              name="start_date"
              value={input.start_date}
              label="Start"
              InputLabelProps={{ shrink: true }}
              error={validator?.start_date}
              onChange={handleChange}
            />
          </Grid>
          <Grid xs={12} md="auto">
            to
          </Grid>
          <Grid xs={12} md>
            <CInput
              type="date"
              name="end_date"
              value={input.end_date}
              label="End"
              InputLabelProps={{ shrink: true }}
              error={validator?.end_date}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </CFormControl>

      <CFormControl
        label="Enrolments Quota"
        size={4}
        note="If the quota is reached, no more enrollments can be made. Leave empty for unlimited enrollments."
      >
        <CInputNumber
          name="quota"
          value={input.quota}
          label="Enter quota"
          min={0}
          error={validator?.quota}
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
          required
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
          required
          onChange={handleChange}
        />
      </CFormControl>

      <Box my={3}>
        <Divider />
      </Box>

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

      <CFormControl label="SEO Metadata">
        <Grid container spacing={2} columns={12}>
          <Grid xs={12}>
            <CInput
              name="meta_title"
              value={input.meta_title}
              label="Meta title"
              error={validator?.meta_title}
              onChange={handleChange}
            />
          </Grid>
          <Grid xs={12}>
            <CInput
              multiline
              minRows={3}
              name="meta_description"
              value={input.meta_description}
              label="Meta description"
              rows="4"
              error={validator?.meta_description}
              onChange={handleChange}
            />
          </Grid>
          <Grid xs={12}>
            <CInput
              name="meta_tag"
              value={input.meta_tag}
              label="Meta tags"
              rows="4"
              error={validator?.meta_tag}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </CFormControl>
    </CBox>
  );
}
