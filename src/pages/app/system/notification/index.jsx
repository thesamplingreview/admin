import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { appRoute } from '@/helpers/route';
import { useOnce } from '@/helpers/hooks';
import { useFetch } from '@/contexts/hooks/auth';
import { useToast } from '@/contexts/hooks/toast';
import CBox from '@/components/CBox.jsx';
import CTextArea from '@/components/CTextArea.jsx';
import CLoadingButton from '@/components/CLoadingButton.jsx';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import ConfigItem from '@/components/pages/system/ConfigItem.jsx';

export default function SystemEmailTemplate() {
  const doFetch = useFetch();
  const pushToast = useToast();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [input, setInput] = useState({
    admin_emails: '',
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
        title="Admin Notification"
        navs={[
          {
            name: 'System',
            route: appRoute('/system'),
          },
          {
            name: 'Admin notification',
          },
        ]}
      />

      <Box mt={-2} mb={4}>
        <Typography variant="body2" color="text.light">
          Admin notification settings.
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
        {/* admin_emails */}
        <ConfigItem
          heading="Email Notification"
          desc={(
            <Typography variant="body2" mb={2}>
              Who will receive the admin email notification?
            </Typography>
          )}
        >
          <Box mb={0}>
            <CTextArea
              label="Email Address(s)"
              placeholder="Enter emails"
              helperText="Each email per line."
              name="admin_emails"
              value={input.admin_emails || ''}
              onChange={handleChange}
            />
          </Box>
        </ConfigItem>
      </CBox>
    </>
  );
}
