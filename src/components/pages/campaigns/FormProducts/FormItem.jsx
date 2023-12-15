import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CAvatar from '@/components/CAvatar.jsx';
import CFormControl from '@/components/CFormControl.jsx';
// import CInput from '@/components/CInput.jsx';
import CSwitch from '@/components/CSwitch.jsx';
import CSelect from '@/components/CSelect.jsx';
import CSelectMultiple from '@/components/CSelectMultiple.jsx';
import FasIcon from '@/components/FasIcon.jsx';

export default function FormItem({
  item,
  formFields,
  onChange,
  onRemove,
}) {
  const [isShow, setIsShow] = useState(false);

  const handleChange = (e) => {
    onChange({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box
      sx={{
        borderBottom: '1px solid var(--border-500)',
      }}
    >
      <FormItemHeader
        item={item}
        isShow={isShow}
        onToggle={() => setIsShow(!isShow)}
      />
      {isShow && (
        <FormItemBody
          item={item}
          formFields={formFields}
          onToggle={() => setIsShow(!isShow)}
          onChange={handleChange}
          onRemove={onRemove}
        />
      )}
    </Box>
  );
}

function FormItemHeader({ item, isShow, onToggle }) {
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
      onClick={onToggle}
    >
      <CAvatar
        name={item.name}
        src={item.imageUrl}
        variant="rounded"
        sx={{ width: 60, height: 60 }}
      />
      <Box px={3} flexGrow="1">
        <Typography component="div" fontWeight="500">
          {item.name}
          {item.filterable && ' *'}
        </Typography>
        <Typography component="div" variant="caption" color="text.light">
          {item.brand}
        </Typography>
      </Box>
      <FasIcon name={isShow ? 'fa-chevron-up' : 'fa-chevron-down'} color="text.light" />
    </Box>
  );
}

function FormItemBody({
  item,
  formFields,
  onToggle,
  onChange,
  onRemove,
}) {
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
      <CFormControl
        label="Filterable"
        note={(
          <Box>Enable filter on this product.<br/>Only <i>Select, True/False</i> field type can be used as filter</Box>
        )}
      >
        <CSwitch
          name="filterable"
          label="Mark product as filterable"
          checked={item.filterable}
          onChange={handleChecked}
        />
      </CFormControl>

      {/* dynamic fields */}
      {item.filterable && (
        <FormItemBodyDynamic
          item={item}
          fields={formFields}
          onChange={onChange}
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

function FormItemSubbox({ children, label, ...props }) {
  return (
    <Box {...props} border="1px solid" borderColor="border.main" p={3}>
      <Box mt={-5} ml={-2}>
        <Typography
          display="inline-block"
          fontSize="0.875rem"
          fontWeight="500"
          bgcolor="#fff"
          color="text.light"
          p={1}
          mb={1}
          sx={{ pointerEvents: 'none' }}
        >
          {label}
        </Typography>
      </Box>
      {children}
    </Box>
  );
}

function FormItemBodyDynamic({ item, fields, onChange }) {
  if (!fields.length) {
    return (
      <FormItemSubbox label="Invalid Form" my={3}>
        <Box py={4} textAlign="center" color="text.light">
          Unable to locate available fields.<br/>Make sure you have assigned a Form to this campaign.
        </Box>
      </FormItemSubbox>
    );
  }

  return (
    <>
      <FormItemSubbox label="AND conditions" my={3}>
        {fields.map((field) => (
          <FormItemBodyDynamicInput
            key={field.id}
            field={field}
            name={`config.and.${field.id}`}
            value={item[`config.and.${field.id}`] || []}
            onChange={onChange}
          />
        ))}
      </FormItemSubbox>

      <FormItemSubbox label="OR conditions" my={3}>
        {fields.map((field) => (
          <FormItemBodyDynamicInput
            key={field.id}
            field={field}
            name={`config.or.${field.id}`}
            value={item[`config.or.${field.id}`] || []}
            onChange={onChange}
          />
        ))}
      </FormItemSubbox>
    </>
  );
}

function FormItemBodyDynamicInput({
  field,
  name,
  value,
  onChange,
}) {
  if (field.type === 'select') {
    return (
      <CFormControl
        label={`${field.name} matches`}
        labelColProps={{ md: 5, lg: 5 }}
        inputColProps={{ md: 7, lg: 7 }}
      >
        <CSelectMultiple
          options={field.options}
          name={name}
          label="Select"
          value={value}
          onChange={onChange}
        />
      </CFormControl>
    );
  }

  if (field.type === 'yes_no') {
    return (
      <CFormControl
        label={`${field.name} is`}
        labelColProps={{ md: 5, lg: 5 }}
        inputColProps={{ md: 7, lg: 7 }}
      >
        <CSelect
          options={[
            { id: 'Yes', name: 'Yes' },
            { id: 'No', name: 'No' },
          ]}
          name={name}
          label="Value"
          value={value}
          onChange={onChange}
        />
      </CFormControl>
    );
  }

  return null;
}
