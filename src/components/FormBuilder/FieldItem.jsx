import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CInput from '@/components/CInput.jsx';
import CSelect from '@/components/CSelect.jsx';
import CSwitch from '@/components/CSwitch.jsx';
import CFormControl from '@/components/CFormControl.jsx';
import CConfirmAlert from '@/components/CConfirmAlert.jsx';
import FasIcon from '@/components/FasIcon.jsx';
import customOptions from './custom_options';
import allTypes from './types';

export default function FieldItem({
  index,
  field,
  error,
  onChange,
  onRemove,
  ...props
}) {
  const [isConfirm, setIsConfirm] = useState(false);

  const handleToggle = () => {
    onChange({
      ...field,
      show: !field.show,
    });
  };

  const handleChange = (e) => {
    onChange({
      ...field,
      [e.target.name]: e.target.value,
    });
  };

  const handleRemove = () => {
    onRemove(field);
  };

  return (
    <Box
      {...props}
      sx={[
        { ...props.sx },
        Boolean(error) && {
          border: '1px solid',
          borderColor: 'error.main',
        },
      ]}
    >
      <FieldItemHeader
        index={index}
        field={field}
        isShow={field.show}
        error={error}
        onClick={handleToggle}
      />
      {/* body */}
      {field.show && (
        <FieldItemBody
          field={field}
          error={error}
          onToggle={handleToggle}
          onChange={handleChange}
          onRemove={() => setIsConfirm(true)}
        />
      )}

      {/* remove confirmation */}
      <CConfirmAlert
        open={isConfirm}
        title="Delete Confirmation"
        message="Are you sure want to remove this record?"
        onCancel={() => setIsConfirm(false)}
        onConfirm={handleRemove}
      />
    </Box>
  );
}

function FieldItemHeader({
  field,
  index,
  isShow,
  onClick,
}) {
  const typeName = useMemo(() => {
    const found = allTypes.find((d) => d.id === field.type);
    return found.name || field.type;
  }, [field.type]);

  return (
    <Box
      component="header"
      display="flex"
      alignItems="center"
      px={3}
      py={2}
      sx={[
        {
          cursor: 'pointer',
          transition: 'background .3s',
          '&:hover': {
            backgroundColor: 'var(--bg-500)',
          },
        },
        isShow && {
          backgroundColor: 'var(--bg-500)',
        },
      ]}
      onClick={onClick}
    >
      <Box p={1} mr={2} className="drag-handler" sx={{ cursor: 'grab' }}>
        <FasIcon name="fa-grip-vertical" color="text.light" />
      </Box>
      <Box
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          width: '2rem',
          height: '2rem',
          border: '1px solid var(--color-300)',
          borderRadius: '50%',
        }}
      >
        {index}
      </Box>
      <Box px={3} flexGrow="1">
        <Typography
          component="div"
          variant="body1"
          fontWeight="500"
          sx={[
            !field.name && {
              color: 'text.light',
              fontStyle: 'italic',
              fontWeight: 400,
            },
          ]}
        >
          {field.name || 'No field name'}
          {field.mandatory && (
            <Typography variant="inehrit" ml={0.5}>*</Typography>
          )}
        </Typography>
        <Stack direction="row" spacing={3}>
          <Typography variant="caption" color="text.light">
            Type: {typeName}
          </Typography>
        </Stack>
      </Box>
      <FasIcon name={isShow ? 'fa-chevron-up' : 'fa-chevron-down'} color="text.light" />
    </Box>
  );
}

function FieldItemBody({
  field,
  error,
  onToggle,
  onChange,
  onRemove,
}) {
  // enable type-only options config
  const CustomOptionComp = customOptions[field.type] || null;

  const handleChecked = (e) => {
    onChange({
      target: {
        name: e.target.name,
        value: e.target.checked,
      },
    });
  };

  return (
    <Box px={3} py={2}>
      <CFormControl label="Field Name">
        <CInput
          name="name"
          label="Enter field name"
          required
          error={error?.name}
          value={field.name || ''}
          onChange={onChange}
        />
      </CFormControl>
      <CFormControl label="Description">
        <CInput
          name="description"
          label="Enter description"
          value={field.description || ''}
          onChange={onChange}
        />
      </CFormControl>
      <CFormControl label="Field Type">
        <CSelect
          name="type"
          label="Select field type"
          options={allTypes}
          required
          value={field.type}
          onChange={onChange}
        />
      </CFormControl>
      <CFormControl label="Required">
        <CSwitch
          name="mandatory"
          label="Is mandatory field"
          checked={field.mandatory}
          onChange={handleChecked}
        />
      </CFormControl>
      <CFormControl label="Hint">
        <CInput
          name="hint"
          label="Enter hint"
          value={field.hint || ''}
          onChange={onChange}
        />
      </CFormControl>

      {CustomOptionComp && (
        <CustomOptionComp
          field={field}
          error={error}
          onChange={onChange}
          onCheck={handleChecked}
        />
      )}

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button
          color="error"
          size="small"
          startIcon={<FasIcon name="fa-trash-can" />}
          onClick={onRemove}
        >
          Remove
        </Button>
        <Button
          variant="outlined"
          color="text"
          size="small"
          onClick={onToggle}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
}
