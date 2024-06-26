import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { appRoute } from '@/helpers/route';
import { useOnce } from '@/helpers/hooks';
import { useFetch } from '@/contexts/hooks/auth';
import { useToast } from '@/contexts/hooks/toast';
import CBox from '@/components/CBox.jsx';
import CInput from '@/components/CInput.jsx';
import CLoadingButton from '@/components/CLoadingButton.jsx';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import ConfigItem from '@/components/pages/system/ConfigItem.jsx';

export default function SystemEmailTemplate() {
  const doFetch = useFetch();
  const pushToast = useToast();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [input, setInput] = useState({
    mailersend_tmpl_base: '',
    mailersend_tmpl_reset_password: '',
    // sendgrid_template_id_reset_password: '',
    // sendgrid_template_id_campaign_enrolled_user: '',
    // sendgrid_template_id_campaign_enrolled_admin: '',
    // sendgrid_template_id_signup_user: '',
    // sendgrid_template_id_signup_admin: '',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await doFetch('/v1/admin/configs', {
        params: {
          keys: Object.keys(input).join(','),
        },
      });
      setInput(data);
    } catch (err) {
      // push toast
      pushToast('error', 'Failed to retrieve configs!');
    }
    setLoading(false);
  };

  const saveData = async () => {
    setSaving(true);
    try {
      const formdata = {
        configs: Object.keys(input).map((key) => ({
          key,
          value: input[key] || '',
        })),
      };
      const { code, data } = await doFetch('/v1/admin/configs', {
        method: 'PUT',
        data: formdata,
      });
      if (code !== 200) {
        throw new Error('Error');
      }
      setInput(data);
      // push toast
      pushToast('success', 'Configs updated!');
    } catch (err) {
      // push toast
      pushToast('error', 'Failed to save configs!');
    }
    setSaving(false);
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveData();
  };

  useOnce(() => {
    fetchData();
  });

  return (
    <>
      <PageHeader
        title="Email Templates Setting"
        navs={[
          {
            name: 'System',
            route: appRoute('/system'),
          },
          {
            name: 'Email Templates',
          },
        ]}
      />

      <Box mt={-2} mb={4}>
        <Typography variant="body2" color="text.light">
          The email notification will rely on MailerSend email API and email template features. <br />Refer to MailerSend documentation for more detail. (<a href="https://developers.mailersend.com" target="_blank" rel="noreferrer noopener">link</a>)
        </Typography>
      </Box>

      <CBox
        component="form"
        noPadding
        mb={5}
        footer={(
          <Box display="flex" justifyContent="flex-end">
            <CLoadingButton
              type="submit"
              variant="contained"
              disabled={loading}
              loading={saving}
            >
              Save
            </CLoadingButton>
          </Box>
        )}
        onSubmit={handleSubmit}
      >
        {/* base template */}
        <ConfigItem
          heading="Base Template"
          desc={(
            <>
              <Typography variant="body2" mb={2}>
                Base template will be used for dynamic email layout.
              </Typography>
              <Box display="flex">
                <Typography variant="body2" fontSize="0.75em" pt={0.25} mr={2}>
                  Variables:
                </Typography>
                <VariableTags
                  items={[
                    '{{html}}',
                  ]}
                />
              </Box>
            </>
          )}
        >
          <Box mb={0}>
            <CInput
              label="Template ID"
              helperText="Email won't be send out when empty."
              name="mailersend_tmpl_base"
              value={input.mailersend_tmpl_base || ''}
              onChange={handleChange}
            />
          </Box>
        </ConfigItem>

        <Divider />

        {/* reset password */}
        <ConfigItem
          heading="Forgot Password Email"
          desc={(
            <>
              <Typography variant="body2" mb={2}>
                Email notification when user request for password reset.
              </Typography>
              <Box display="flex">
                <Typography variant="body2" fontSize="0.75em" pt={0.25} mr={2}>
                  Variables:
                </Typography>
                <VariableTags
                  items={[
                    '{{reset_link}}',
                    '{{email}}',
                    '{{token}}',
                  ]}
                />
              </Box>
            </>
          )}
        >
          <Box mb={0}>
            <CInput
              label="Send to user"
              helperText="Email won't be send out when empty."
              name="mailersend_tmpl_reset_password"
              value={input.mailersend_tmpl_reset_password || ''}
              onChange={handleChange}
            />
          </Box>
        </ConfigItem>
      </CBox>
    </>
  );
}

function VariableTags({ items }) {
  return (
    <Stack
      flexGrow="1"
      direction="row"
      flexWrap="wrap"
      gap={1}
    >
      {items.map((item, index) => (
        <Chip
          key={index}
          label={item}
          size="small"
          sx={{
            py: 0.35,
            height: 'auto',
            fontSize: '0.75em',
            color: '#666',
            textTransform: 'initial',
          }}
        />
      ))}
    </Stack>
  );
}
