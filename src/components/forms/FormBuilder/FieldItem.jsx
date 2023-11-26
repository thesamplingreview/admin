import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CInput from '@/components/CInput.jsx';
import CSelect from '@/components/CSelect.jsx';
import CTextArea from '@/components/CTextArea.jsx';
import CSwitch from '@/components/CSwitch.jsx';
import CFormControl from '@/components/CFormControl.jsx';
import FasIcon from '@/components/FasIcon.jsx';
import allTypes from './types';

export default function FieldItem({ index, field, onChange }) {
  const [isShow, setIsShow] = useState(false);

  return (
    <Box>
      <FieldItemHeader
        index={index}
        field={field}
        isShow={isShow}
        onClick={() => setIsShow((state) => !state)}
      />
      {/* body */}
      {isShow && (
        <FieldItemBody
          field={field}
          onChange={onChange}
        />
      )}
    </Box>
  );
}

function FieldItemHeader({
  field,
  index,
  isShow,
  onClick,
}) {
  return (
    <Box
      component="header"
      display="flex"
      alignItems="center"
      px={3}
      py={2}
      sx={[
        {
          borderTop: '1px solid var(--border-500)',
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
        <Typography component="div" variant="body1" fontWeight="500">
          {field.name}
        </Typography>
        <Stack direction="row" spacing={3}>
          <Typography variant="caption" color="text.light">
            Type: {field.type}
          </Typography>
          <Typography variant="caption" color="text.light">
            Required: {field.mandatory ? 'Yes' : 'No'}
          </Typography>
        </Stack>
      </Box>
      <FasIcon name={isShow ? 'fa-chevron-up' : 'fa-chevron-down'} />
    </Box>
  );
}

function FieldItemBody({
  field,
  onChange,
}) {
  const handleChange = (e) => {
    onChange({
      ...field,
      [e.target.name]: e.target.value,
    });
  };

  const handleChecked = (e) => {
    onChange({
      ...field,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <Box px={3} py={2}>
      <CFormControl label="Field Name">
        <CInput
          name="name"
          label="Enter field name"
          value={field.name}
          onChange={handleChange}
        />
      </CFormControl>
      <CFormControl label="Field Type">
        <CSelect
          name="type"
          label="Select field type"
          options={allTypes}
          value={field.type}
          onChange={handleChange}
        />
      </CFormControl>
      <CFormControl label="Required">
        <CSwitch
          name="mandatory"
          label="Mandatory field?"
          checked={field.mandatory}
          onChange={handleChecked}
        />
      </CFormControl>

      <FieldItemDynamicBody
        field={field}
        onChange={handleChange}
        onCheck={handleChecked}
      />
    </Box>
  );
}

function FieldItemDynamicBody({
  field,
  onChange,
  onCheck,
}) {
  // text field
  if (field.type === 'text') {
    return (
      <>
        <CFormControl label="Placeholder">
          <CInput
            name="placeholder"
            label="Placeholder text"
            value={field.placeholder}
            onChange={onChange}
          />
        </CFormControl>
      </>
    );
  }
  // select field
  if (field.type === 'select') {
    return (
      <>
        <CFormControl label="Select Options">
          <CTextArea
            name="options"
            label="Enter option"
            value={field.options}
            onChange={onChange}
            helperText="Each line represent a single option"
          />
        </CFormControl>
      </>
    );
  }
  return null;
}
