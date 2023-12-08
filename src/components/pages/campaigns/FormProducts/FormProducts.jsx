import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { setValue, toDotProps } from '@/helpers/utils';
import { useFetch } from '@/contexts/hooks/auth';
import { useToast } from '@/contexts/hooks/toast';
import { useModel } from '@/contexts/hooks/module';
import CBox from '@/components/CBox.jsx';
import CLoadingButton from '@/components/CLoadingButton.jsx';
import FasIcon from '@/components/FasIcon.jsx';
import FormItem from './FormItem.jsx';
import DialogAddProduct from './DialogAddProduct.jsx';

export default function FormProducts({ formFields, ...props }) {
  const doFetch = useFetch();
  const pushToast = useToast();
  const [model, setModel] = useModel();

  const genInputs = (dataset) => {
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
  };

  const [inputs, setInputs] = useState(genInputs(model.products));
  const [loading, setLoading] = useState(false);
  const [validator, setValidator] = useState(null);
  const [isAdd, setIsAdd] = useState(false);

  const filterableFields = useMemo(() => {
    const types = [
      'select', 'true_false',
    ];
    return formFields
      .filter((d) => types.includes(d.type))
      .map((d) => ({
        id: d.id,
        type: d.type,
        name: d.name,
        options: d.options?.split('\n').map((val) => ({
          id: val,
          name: val,
        })) || [],
      }));
  }, [formFields]);

  const genFormData = () => {
    return inputs.map((item) => {
      const input = {};
      Object.keys(item).forEach((key) => {
        setValue(input, key, item[key]);
      });
      return input;
    }).map((item) => ({
      id: item.id,
      filterable: item.filterable,
      config: JSON.stringify(item.config || {}),
    }));
  };

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
      const beInputs = genFormData();

      const formdata = {
        products: beInputs,
      };
      const { code } = await doFetch(`/v1/admin/campaigns/${model.id}/products`, {
        method: 'PUT',
        data: formdata,
      });
      if (code !== 200) {
        throw new Error('Invalid API');
      }
      // as returned data was product_campaign data, hence using refresh campaign model to update the model
      const { data } = await doFetch(`/v1/admin/campaigns/${model.id}`);
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
