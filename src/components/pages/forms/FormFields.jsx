import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { setValue, toDotProps } from '@/helpers/utils';
import { useFetch } from '@/contexts/hooks/auth';
import { useToast } from '@/contexts/hooks/toast';
import { useModel } from '@/contexts/hooks/module';
import CBox from '@/components/CBox.jsx';
import CLoadingButton from '@/components/CLoadingButton.jsx';
import { FormBuilder } from '@/components/FormBuilder';

function genInputs(dataset) {
  if (!dataset) {
    return [];
  }
  return dataset.map((d) => {
    const data = {
      id: d.id,
      name: d.name,
      type: d.type,
      description: d.description,
      hint: d.hint,
      placeholder: d.placeholder,
      options: d.options,
      mandatory: d.mandatory,
      config: d.config,
    };
    return toDotProps(data);
  });
}

function genFormData(dataset) {
  return dataset.map((data) => {
    const input = {};
    Object.keys(data).forEach((key) => {
      setValue(input, key, data[key]);
    });
    return input;
  }).map((data) => ({
    ...data,
    config: data.config ? JSON.stringify(data.config) : null,
  }));
}

export default function FormFields({ ...props }) {
  const doFetch = useFetch();
  const pushToast = useToast();
  const [model, setModel] = useModel();

  const $builder = useRef(null);
  const [loading, setLoading] = useState(false);
  const [validator, setValidator] = useState(null);

  const handleSave = async () => {
    // setLoading(true);
    setValidator(null);
    try {
      if (!$builder.current) {
        throw new Error('Unable to get ref: $builder');
      }
      const fields = genFormData($builder.current.getValue());

      const formdata = {
        fields,
      };
      const { code, data } = await doFetch(`/v1/admin/forms/${model.id}/fields`, {
        method: 'PUT',
        data: formdata,
      });
      if (code !== 200) {
        throw new Error('Invalid API');
      }
      // update cached
      setModel(data);
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
        defaultValue={genInputs(model.fields)}
        validator={validator}
      />
    </CBox>
  );
}
