import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { setValue, toDotProps } from '@/helpers/utils';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';
import { useToast } from '@/contexts/hooks/toast';
import { useModel } from '@/contexts/hooks/module';
import CBox from '@/components/CBox.jsx';
import CLoadingButton from '@/components/CLoadingButton.jsx';
import FasIcon from '@/components/FasIcon.jsx';
import FormItem from './FormItem.jsx';
import DialogAddProduct from './DialogAddProduct.jsx';

function genInputs(dataset) {
  if (!dataset) {
    return [];
  }
  return dataset.map((d) => {
    const data = {
      id: d.id,
      name: d.name,
      brand: d.brand,
      imageUrl: d.image_url || '',
      filterable: d.campaign_products?.filterable || false,
      config: d.campaign_products?.config || {},
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
    id: data.id,
    filterable: data.filterable,
    config: JSON.stringify(data.config || {}),
  }));
}

export default function FormProducts({ formFields, ...props }) {
  const doFetch = useFetch();
  const pushToast = useToast();
  const [model, setModel] = useModel();
  const endpointGet = useRoleEndpoint(`/campaigns/${model.id}`);
  const endpointPost = useRoleEndpoint(`/campaigns/${model.id}/products`);

  const [inputs, setInputs] = useState(genInputs(model.products));
  const [loading, setLoading] = useState(false);
  const [, setValidator] = useState(null);
  const [isAdd, setIsAdd] = useState(false);

  const filterableFields = useMemo(() => {
    const types = [
      'select', 'yes_no',
    ];
    return formFields
      .filter((d) => types.includes(d.type))
      .map((d) => ({
        id: d.id,
        type: d.type,
        name: d.name,
        options: d.options.map((opt) => ({
          id: opt.id,
          name: opt.label,
        })),
      }));
  }, [formFields]);

  const handleAdd = () => {
    setIsAdd(true);
  };

  const handleAdded = (newInput) => {
    const newInputs = [...inputs];
    newInputs.push({
      ...newInput,
      filterable: false,
      config: {},
    });
    setInputs(newInputs);
    // close modal
    setIsAdd(false);
  };

  const handleInputChange = (index, newInput) => {
    const newInputs = [...inputs];
    newInputs[index] = newInput;
    setInputs(newInputs);
  };

  const handleInputRemove = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const handleSave = async () => {
    setLoading(true);
    setValidator(null);
    try {
      const beInputs = genFormData(inputs);

      const formdata = {
        products: beInputs,
      };
      const { code } = await doFetch(endpointPost, {
        method: 'PUT',
        data: formdata,
      });
      if (code !== 200) {
        throw new Error('Invalid API');
      }
      // as returned data was product_campaign data, hence using refresh campaign model to update the model
      const { data } = await doFetch(endpointGet);
      setModel(data);
      setInputs(genInputs(data.products));
      // push toast
      pushToast('success', 'Products updated!');
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
      title="Campaign Products"
      noPadding
      action={(
        <Box my={-1}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={handleAdd}
          >
            Add Product
          </Button>
        </Box>
      )}
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
      <Box>
        {inputs.map((input, index) => (
          <FormItem
            key={input.id}
            item={input}
            formFields={filterableFields}
            onChange={(newInput) => handleInputChange(index, newInput)}
            onRemove={() => handleInputRemove(index)}
          />
        ))}
      </Box>
      <Box>
        <Button
          variant="text"
          fullWidth
          sx={{
            fontSize: '0.875em',
            color: 'var(--color-300)',
            py: 2,
          }}
          startIcon={<FasIcon name="fa-circle-plus" />}
          onClick={handleAdd}
        >
          Add Product
        </Button>
      </Box>

      <DialogAddProduct
        open={isAdd}
        selected={inputs.map((d) => d.id)}
        onClose={() => setIsAdd(false)}
        onSelect={handleAdded}
      />
    </CBox>
  );
}
