import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CSelect from '@/components/CSelect.jsx';
import FasIcon from '@/components/FasIcon.jsx';

export default function InputLogic({
  currField,
  allFields,
  name,
  value,
  onChange,
}) {
  const allowedFields = useMemo(() => {
    const allowedTypes = [
      'select',
      'yes_no',
      'state',
    ];
    return allFields.filter((d) => allowedTypes.includes(d.type) && d.id !== currField.id);
  }, [allFields, currField.id]);

  const triggerChange = (newValue) => {
    onChange({
      target: {
        name,
        value: newValue,
      },
    });
  };

  const handleChange = (newInput, index) => {
    const newValue = [...value];
    newValue[index] = newInput;

    triggerChange(newValue);
  };

  const handleAddRule = () => {
    const newValue = value ? [...value] : [];
    newValue.push({
      field: '',
      value: '',
    });

    triggerChange(newValue);
  };

  const handleRemoveRule = (index) => {
    const newValue = value ? [...value] : [];
    newValue.splice(index, 1);

    triggerChange(newValue);
  };

  return (
    <Box
      border="1px solid #ddd"
      borderRadius="1rem"
      p={3}
    >
      {/* loop */}
      {value && value.length > 0 && (
        <>
          <Grid container spacing={2} mb={1}>
            <Grid xs={12} md={6}>
              <Typography variant="body2" color="text.light">
                when field
              </Typography>
            </Grid>
            <Grid xs={12} md={6}>
              <Typography variant="body2" color="text.light">
                value equal
              </Typography>
            </Grid>
          </Grid>
          {value.map((input, index) => (
            <InputLogicItem
              key={index}
              options={allowedFields}
              index={index}
              input={input}
              onChange={handleChange}
              onRemove={handleRemoveRule}
            />
          ))}
        </>
      )}
      {/* empty */}
      {!(value && value.length > 0) && (
        <Box textAlign="center" mt={2}>
          <Typography variant="body2" color="text.light">
            No rule yet
          </Typography>
        </Box>
      )}

      <Box textAlign="center" py={1} mb={1}>
        <Button
          variant="text"
          color="text"
          startIcon={<FasIcon name="fa-plus" />}
          size="small"
          sx={{ color: 'text.light' }}
          onClick={handleAddRule}
        >
          Add new rule
        </Button>
      </Box>
    </Box>
  );
}

function InputLogicItem({
  options,
  index,
  input,
  onChange,
  onRemove,
}) {
  const values = useMemo(() => {
    const selectedOption = options.find((d) => d.id === input.field);
    if (selectedOption?.type === 'yes_no') {
      return [
        { id: 'Yes', name: 'Yes' },
        { id: 'No', name: 'No' },
      ];
    }
    if (selectedOption?.type === 'select') {
      return selectedOption.options.map((d) => ({
        id: d.label,
        name: d.label,
      }));
    }
    return [];
  }, [options, input]);

  const handleChangeField = (e) => {
    onChange({
      field: e.target.value,
      value: '',
    }, index);
  };

  const handleChangeValue = (e) => {
    onChange({
      field: input.field,
      value: e.target.value,
    }, index);
  };

  const handleRemove = () => {
    onRemove(index);
  };

  return (
    <Grid container spacing={2} alignItems="center" mb={1}>
      <Grid xs={12} md>
        <CSelect
          label="Select field"
          placeholder="Select"
          options={options}
          name="field"
          value={input.field}
          onChange={handleChangeField}
        />
      </Grid>
      <Grid xs={12} md>
        <CSelect
          label="Select value"
          placeholder="Select"
          options={values}
          name="value"
          value={input.value}
          disabled={!values.length}
          onChange={handleChangeValue}
        />
      </Grid>
      <Grid xs="auto">
        <IconButton
          color="error"
          onClick={handleRemove}
        >
          <FasIcon name="fa-times" fontSize="16px" />
        </IconButton>
      </Grid>
    </Grid>
  );
}
