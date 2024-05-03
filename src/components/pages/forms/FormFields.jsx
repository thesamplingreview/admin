import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';
import { useToast } from '@/contexts/hooks/toast';
import { useModel } from '@/contexts/hooks/module';
import CBox from '@/components/CBox.jsx';
import CLoadingButton from '@/components/CLoadingButton.jsx';
import { FormBuilder } from '@/components/FormBuilder';

export default function FormFields({ ...props }) {
  const doFetch = useFetch();
  const pushToast = useToast();
  const [model, setModel] = useModel();
  const endpointPut = useRoleEndpoint(`/forms/${model.id}/fields`);

  const $builder = useRef(null);
  const [loading, setLoading] = useState(false);
  const [validator, setValidator] = useState(null);

  const handleSave = async () => {
    setLoading(true);
    setValidator(null);
    try {
      if (!$builder.current) {
        throw new Error('Unable to get ref: $builder');
      }
      const formdata = {
        fields: $builder.current.getValue(),
      };
      const { code, data } = await doFetch(endpointPut, {
        method: 'PUT',
        data: formdata,
      });
      if (code !== 200) {
        throw new Error('Invalid API');
      }
      // update cached
      setModel((oldState) => ({
        ...oldState,
        ...data,
      }));
      // push toast
      pushToast('success', 'Form updated!');
    } catch (err) {
      if (err.response?.data?.code === 422) {
        setValidator(err.response.data.validator.reduce((acc, cur) => {
          // using regex to find out which index & prop
          const regex = /fields\[(\d+)\]\.(\w+)/;
          const match = cur.field.match(regex);
          if (!match) {
            return acc;
          }
          if (!acc[match[1]]) {
            acc[match[1]] = {};
          }
          acc[match[1]][match[2]] = cur.msg;
          return acc;
        }, {}));
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
      title="Form Fields"
      noPadding
      footer={(
        <Box display="flex" justifyContent="flex-end">
          <CLoadingButton
            variant="contained"
            loading={loading}
            onClick={handleSave}
          >
            Save
          </CLoadingButton>
        </Box>
      )}
    >
      <FormBuilder
        ref={$builder}
        defaultValue={model.fields || []}
        validator={validator}
      />
    </CBox>
  );
}
