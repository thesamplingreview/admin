import { useState } from 'react';
import Box from '@mui/material/Box';
// import { FormBuilderProvider } from './context.jsx';
import FieldsList from './FieldsList.jsx';

export default function FormBuilder({
  defaultValue,
}) {
  const [fields, setFields] = useState(defaultValue.map((d) => ({
    ...d,
    key: d.id,
  })));

  return (
    <Box>
      <FieldsList
        fields={fields}
        onChange={setFields}
      />
    </Box>
  );
}
