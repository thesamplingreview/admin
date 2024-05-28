import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRoute } from '@/helpers/route';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';
import { useToast } from '@/contexts/hooks/toast';
import { useModel, useOptions } from '@/contexts/hooks/module';
import CBox from '@/components/CBox.jsx';
import { WorkflowEditor } from '@/components/WorkflowEditor';
import DialogEdit from './DialogEdit.jsx';

export default function FormWorkflow({ ...props }) {
  const navigate = useNavigate();
  const doFetch = useFetch();
  const pushToast = useToast();
  const [model] = useModel();
  const options = useOptions();

  const endpointPut = useRoleEndpoint(`/workflows/${model.id}/tasks`);

  const [saving, setSaving] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleBack = () => {
    navigate(appRoute(`/campaigns/${model.campaign_id}/workflows`));
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

  return (
    <>
      <CBox {...props} noPadding>
        <WorkflowEditor
          title={`${model.name || '-'}`}
          options={options}
          value={model.tasks || []}
          loading={saving}
          initFull
          onSave={handleSubmit}
          onEditName={() => setIsEdit(true)}
          onBack={handleBack}
        />
      </CBox>

      <DialogEdit
        open={isEdit}
        onClose={() => setIsEdit(false)}
        onEdited={() => setIsEdit(false)}
      />
    </>
  );
}
