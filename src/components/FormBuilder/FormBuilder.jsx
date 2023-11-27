import { useState, forwardRef, useImperativeHandle } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FasIcon from '@/components/FasIcon.jsx';
import FieldsList from './FieldsList.jsx';

// eslint-disable-next-line react/display-name
const FormBuilderRef = forwardRef(({
  defaultValue,
  validator,
}, ref) => {
  const [fields, setFields] = useState(defaultValue.map((d) => ({
    ...d,
    key: d.id,
    show: false,
  })));

  const handleAdd = () => {
    const newFields = [...fields];
    newFields.push({
      key: (new Date()).valueOf(),
      type: 'text',
      name: '',
      mandatory: false,
      show: true,
    });
    setFields(newFields);
  };

  // expose
  useImperativeHandle(ref, () => ({
    getValue: () => {
      return fields;
    },
  }), [fields]);

  return (
    <>
      {/* listing */}
      {fields.length !== 0 && (
        <Box>
          <FieldsList
            fields={fields}
            errors={validator}
            onChange={setFields}
          />
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
              Add Field
            </Button>
          </Box>
        </Box>
      )}
      {/* empty */}
      {fields.length === 0 && (
        <Box textAlign="center" py={4}>
          <FasIcon name="fa-ghost" fontSize="3rem" color="text.light" />
          <Typography component="div" mt={2}>
            No field yet
          </Typography>
          <Box>
            <Button
              variant="text"
              startIcon={<FasIcon name="fa-circle-plus" />}
              onClick={handleAdd}
            >
              Add Field
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
});

export default FormBuilderRef;
