import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { appRoute } from '@/helpers/route';
import { useOnce } from '@/helpers/hooks';
import { useFetch } from '@/contexts/hooks/auth';
import { useToast } from '@/contexts/hooks/toast';
import CBox from '@/components/CBox.jsx';
import CTextArea from '@/components/CTextArea.jsx';
import CLoadingButton from '@/components/CLoadingButton.jsx';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import ConfigItem from '@/components/pages/system/ConfigItem.jsx';

export default function SystemWorkflow() {
  const doFetch = useFetch();
  const pushToast = useToast();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [input, setInput] = useState({
    wf_send_user_mail_tmpls: [],
    wf_send_user_whatsapp_tmpls: [],
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
        title="Workflow Action Templates"
        navs={[
          {
            name: 'System',
            route: appRoute('/system'),
          },
          {
            name: 'Workfow Action Templates',
          },
        ]}
      />

      <Box mt={-2} mb={4}>
        <Typography variant="body2" color="text.light">
          Configure templates selection mapping for Workflow actions.
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
        {/* email templates */}
        <ConfigItem
          heading="Send User Email Action"
          desc={(
            <>
              <Typography variant="body2" mb={2}>
                Setup MailerSend templates selection on action.
              </Typography>
              <Typography variant="body2" mb={2}>
                Example input:<br />
                11111 : Thank You Email<br />
                22222 : Enrolment Email<br />
              </Typography>
            </>
          )}
        >
          <Box mb={0}>
            <CTextArea
              label="Template ID : Label"
              helperText="Enter each template on a new line."
              name="wf_send_user_mail_tmpls"
              value={input.wf_send_user_mail_tmpls || ''}
              onChange={handleChange}
            />
          </Box>
        </ConfigItem>

        <Divider />

        {/* whatsapp templates */}
        <ConfigItem
          heading="Send User WhatsApp Action"
          desc={(
            <>
              <Typography variant="body2" mb={2}>
                Setup WhatsApp templates selection on action.<br />You can find the template name on <a href="https://business.facebook.com/wa/manage/message-templates/" target="_blank" rel="noreferrer noopener">WhatsApp Manager</a>
              </Typography>
              <Typography variant="body2" mb={2}>
                Example input:<br />
                thank_you : Thank You Message<br />
                follow_up : Follow Up Message<br />
              </Typography>
            </>
          )}
        >
          <Box mb={0}>
            <CTextArea
              label="Template Name : Label"
              helperText="Enter each template on a new line."
              name="wf_send_user_whatsapp_tmpls"
              value={input.wf_send_user_whatsapp_tmpls || ''}
              onChange={handleChange}
            />
          </Box>
        </ConfigItem>
      </CBox>
    </>
  );
}
