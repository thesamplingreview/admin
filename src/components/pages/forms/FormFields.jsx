import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { useFetch } from '@/contexts/hooks/auth';
import { useToast } from '@/contexts/hooks/toast';
import { useModel } from '@/contexts/hooks/module';
import CLoadingButton from '@/components/CLoadingButton.jsx';
import { FormBuilder } from '@/components/FormBuilder';

export default function FormFields() {
  const doFetch = useFetch();
  const pushToast = useToast();
  const [model, setModel] = useModel();

  const $builder = useRef(null);
  const [loading, setLoading] = useState(false);
  const [validator, setValidator] = useState(null);

  const genFormData = () => {
    if (!$builder.current) {
      throw new Error('Unable to get ref: $builder');
    }
    const fields = $builder.current.getValue();
    return fields.map((field) => {
      const input = {};
      // define top level props, the rest will be categories into `config` prop
      const fixedProps = [
        'id', 'name', 'type', 'options', 'description', 'mandatory', 'placeholder',
      ];
      Object.keys(field).forEach((key) => {
        if (fixedProps.includes(key)) {
          input[key] = field[key];
        } else if (key.startsWith('config.')) {
          const configKey = key.replace('config.', '');
          if (!input.config) {
            input.config = {};
          }
          input.config[configKey] = field[key];
        }
      });
      return input;
    });
  };

  const handleSave = async () => {
    setLoading(true);
    setValidator(null);
    try {
      const fields = genFormData();

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
    <>
      <FormBuilder
        ref={$builder}
        defaultValue={model.fields}
        validator={validator}
      />
      <Box px={3} py={2} textAlign="right">
        <CLoadingButton
          variant="contained"
          loading={loading}
          onClick={handleSave}
        >
          Save
        </CLoadingButton>
      </Box>
    </>
  );
}
