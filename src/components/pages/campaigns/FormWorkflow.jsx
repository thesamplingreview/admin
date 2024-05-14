import { useState } from 'react';
import { useOnce } from '@/helpers/hooks';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';
import { useToast } from '@/contexts/hooks/toast';
import { useModel, useOptions } from '@/contexts/hooks/module';
import CBox from '@/components/CBox.jsx';
import CLoader from '@/components/CLoader.jsx';
import CError from '@/components/CError.jsx';
import { WorkflowEditor } from '@/components/WorkflowEditor';

export default function FormWorkflow({ ...props }) {
  const doFetch = useFetch();
  const pushToast = useToast();
  const [model] = useModel();
  const options = useOptions();
  const endpointGet = useRoleEndpoint(`/campaigns/${model.id}/workflow`);
  const endpointPut = useRoleEndpoint(`/campaigns/${model.id}/workflow`);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [input, setInput] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { code, data } = await doFetch(endpointGet);
      if (code !== 200) {
        throw new Error('API error');
      }
      setInput(data?.tasks || []);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  const handleSubmit = async (newInput) => {
    setSaving(true);
    try {
      const formdata = {
        tasks: newInput,
      };
      const { code } = await doFetch(endpointPut, {
        method: 'PUT',
        data: formdata,
      });
      if (code !== 200) {
        throw new Error('Invalid API');
      }
      pushToast('success', 'Workflow updated!');
    } catch (err) {
      if (err.response?.data?.code === 422) {
        const errMsg = err.response.data.validator?.[0]?.msg || 'Invalid submission!';
        pushToast('error', errMsg);
      } else {
        // eslint-disable-next-line no-console
        console.error(err);
        pushToast('error', 'Failed to update entry.');
      }
    }
    setSaving(false);
  };

  useOnce(() => {
    fetchData();
  });

  return (
    <CBox {...props} noPadding>
      {loading && (
        <CLoader />
      )}
      {!loading && error && (
        <CError message={error.message} />
      )}
      {!loading && !error && (
        <WorkflowEditor
          title={`${model.name || ''} Workflow`}
          options={options}
          value={input}
          loading={saving}
          onSave={handleSubmit}
        />
      )}
    </CBox>
  );
}
