import { useState } from 'react';
import { isDate, formatISO } from 'date-fns';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import { useFetch } from '@/contexts/hooks/auth';
import { useToast } from '@/contexts/hooks/toast';
import { useOptions, useModel } from '@/contexts/hooks/module';
import { toFormData } from '@/helpers/utils';
import CBox from '@/components/CBox.jsx';
import CInput from '@/components/CInputLazy.jsx';
import CSelect from '@/components/CSelect.jsx';
// import CTextArea from '@/components/CTextArea.jsx';
import CSwitch from '@/components/CSwitch.jsx';
import CInputImage from '@/components/CInputImage.jsx';
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
    name: model?.name || '',
    slug: model?.slug || '',
    description: model?.description || '',
    intro_title: model?.intro_title || '',
    intro_description: model?.intro_description || '',
    presubmit_title: model?.presubmit_title || '',
    presubmit_description: model?.presubmit_description || '',
    postsubmit_title: model?.postsubmit_title || '',
    postsubmit_description: model?.postsubmit_description || '',
    meta_title: model?.meta_title || '',
    meta_description: model?.meta_description || '',
    meta_tag: model?.meta_tag || '',
    start_date: dateParse(model?.start_date),
    end_date: dateParse(model?.end_date),
    highlight: Boolean(model?.highlight),
    status: model?.status || options.statuses[0].id || '',
    vendor_id: model?.vendor_id || '',
    form_id: model?.form_id || '',
    cover: null,
    coverUrl: model?.cover_url || '',
    background: null,
    backgroundUrl: model?.background_url || '',
  };
}

export default function FormEdit({ ...props }) {
  const doFetch = useFetch();
  const pushToast = useToast();
  const options = useOptions();
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

  const handleCheck = (e) => {
    setInput((state) => ({
      ...state,
      [e.target.name]: e.target.checked,
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
      title="Edit Entry"
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

      <CFormControl label="Campaign Detail">
        <Grid container spacing={2} columns={12}>
          <Grid xs={12}>
            <CInput
              name="name"
              value={input.name}
              label="Enter name"
              required
              error={validator?.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid xs={12}>
            <CInput
              multiline
              minRows={3}
              name="description"
              value={input.description}
              label="Enter description"
              error={validator?.description}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </CFormControl>

      <CFormControl label="Intro Screen">
        <Grid container spacing={2} columns={12}>
          <Grid xs={12}>
            <CInput
              name="intro_title"
              value={input.intro_title}
              label="Enter title"
              error={validator?.intro_title}
              onChange={handleChange}
            />
          </Grid>
          <Grid xs={12}>
            <CInput
              multiline
              minRows={3}
              name="intro_description"
              value={input.intro_description}
              label="Enter description"
              error={validator?.intro_description}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </CFormControl>

      <CFormControl label="Pre-Submit Screen">
        <Grid container spacing={2} columns={12}>
          <Grid xs={12}>
            <CInput
              name="presubmit_title"
              value={input.presubmit_title}
              label="Enter title"
              error={validator?.presubmit_title}
              onChange={handleChange}
            />
          </Grid>
          <Grid xs={12}>
            <CInput
              multiline
              minRows={3}
              name="presubmit_description"
              value={input.presubmit_description}
              label="Enter description"
              error={validator?.presubmit_description}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </CFormControl>

      <CFormControl label="Post-Submit Screen">
        <Grid container spacing={2} columns={12}>
          <Grid xs={12}>
            <CInput
              name="postsubmit_title"
              value={input.postsubmit_title}
              label="Enter title"
              error={validator?.postsubmit_title}
              onChange={handleChange}
            />
          </Grid>
          <Grid xs={12}>
            <CInput
              multiline
              minRows={3}
              name="postsubmit_description"
              value={input.postsubmit_description}
              label="Enter description"
              error={validator?.postsubmit_description}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </CFormControl>

      <CFormControl label="Campaign Period">
        <Grid container spacing={2} columns={12} alignItems="center">
          <Grid xs={12} md>
            <CInput
              type="date"
              name="start_date"
              value={input.start_date}
              label="Start"
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
              error={validator?.end_date}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
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

      <CFormControl label="Background">
        <CInputImage
          name="background"
          value={input.background}
          defaultValue={input.backgroundUrl}
          label="Browse image"
          maxSize={2}
          error={validator?.background}
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

      <Box my={3}>
        <Divider />
      </Box>

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

      <CFormControl label="Enrolment Form">
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

      <CFormControl label="Status" size={4}>
        <CSelect
          options={options.statuses}
          name="status"
          value={input.status}
          label="Select"
          error={validator?.status}
          onChange={handleChange}
        />
      </CFormControl>

      <CFormControl label="Highlighted">
        <CSwitch
          name="highlight"
          label="Mark as highlighted?"
          checked={input.highlight}
          onChange={handleCheck}
        />
      </CFormControl>
    </CBox>
  );
}
