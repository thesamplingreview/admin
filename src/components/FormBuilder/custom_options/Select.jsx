import { useMemo } from 'react';
import { ReactSortable } from 'react-sortablejs';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CInput from '@/components/CInput.jsx';
import CSelect from '@/components/CSelect.jsx';
import CInputUpload from '@/components/CInputUpload.jsx';
import CFormControl from '@/components/CFormControl.jsx';
import FasIcon from '@/components/FasIcon.jsx';

export default function OptionSelect({
  field,
  error,
  onChange,
  onParentChange,
}) {
  const layoutOptions = useMemo(() => ([
    { id: '1', name: '1 column' },
    { id: '2', name: '2 columns' },
    { id: '3', name: '3 columns' },
    { id: '4', name: '4 columns' },
  ]), []);

  return (
    <>
      <CFormControl label="Selection">
        <InputOptions
          name="options"
          value={field.options || []}
          error={error?.options}
          onChange={onParentChange}
        />
      </CFormControl>
      <CFormControl label="Display Layout" size={4}>
        <CSelect
          options={layoutOptions}
          name="layout"
          label="Select layout"
          placeholder="Default"
          value={field.config?.layout || ''}
          onChange={onChange}
        />
      </CFormControl>
      <CFormControl label="Max Selection">
        <CInput
          type="number"
          name="select_count"
          label="Enter number"
          placeholder="Default 1"
          min="1"
          helperText="Hint variable: %%total%%, %%count%%, %%left%%"
          value={field.config?.select_count || ''}
          onChange={onChange}
        />
      </CFormControl>
    </>
  );
}

function InputOptions({
  name, value, error, onChange,
}) {
  const inputs = useMemo(() => {
    return value.map((v) => ({
      id: v.id,
      key: v.key,
      label: v.label,
      sublabel: v.sublabel,
      image_url: v.image_url,
    }));
  }, [value]);

  const triggerChange = (newValue) => {
    onChange({
      target: {
        name,
        value: newValue,
      },
    });
  };

  const handleAdd = () => {
    const newInputs = [...inputs];
    newInputs.push({
      key: (new Date()).valueOf(),
      label: '',
      sublabel: '',
      image_url: '',
    });
    triggerChange(newInputs);
  };

  const handleChange = (index, e) => {
    const newInputs = [...inputs];
    newInputs[index] = {
      ...newInputs[index],
      [e.target.name]: e.target.value,
    };
    triggerChange(newInputs);
  };

  const handleRemove = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    triggerChange(newInputs);
  };

  return (
    <>
      <ReactSortable list={inputs} setList={triggerChange} handle=".drag-handler-2">
        {inputs.map((input, index) => (
          <Grid
            key={index}
            container
            spacing={2}
          >
            <Grid xs="auto">
              <Box p={1} className="drag-handler-2" sx={{ cursor: 'grab' }}>
                <FasIcon name="fa-grip-vertical" color="text.light" />
              </Box>
            </Grid>
            <Grid xs>
              <CInput
                size="small"
                name="label"
                placeholder="Enter value"
                sx={{ fontSize: '1em' }}
                value={input.label || ''}
                onChange={(e) => handleChange(index, e)}
              />
            </Grid>
            <Grid xs={2}>
              <CInputUpload
                name="image_url"
                clearable
                value={input.image_url || ''}
                onChange={(e) => handleChange(index, e)}
              />
            </Grid>
            <Grid xs="auto">
              <IconButton
                sx={{ fontSize: '.875rem' }}
                onClick={() => handleRemove(index)}
              >
                <FasIcon name="fa-times" color="error.main" />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </ReactSortable>

      {error && (
        <Box py={1}>
          <Typography variant="body2" color="error">
            *{error}
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
          onClick={handleAdd}
        >
          Add new option
        </Button>
      </Box>
    </>
  );
}
