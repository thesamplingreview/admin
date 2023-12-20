import { useState } from 'react';
import TextField from '@mui/material/TextField';

export default function CInputLazy({
  name,
  value,
  error,
  onChange,
  ...props
}) {
  const [internal, setInternal] = useState(value);

  const handleChange = (e) => {
    setInternal(e.target.value);
  };

  const handleBlur = (e) => {
    onChange(e);
  };

  return (
    <TextField
      {...props}
      name={name}
      value={internal}
      fullWidth
      error={Boolean(error)}
      helperText={error || props.helperText}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
}
