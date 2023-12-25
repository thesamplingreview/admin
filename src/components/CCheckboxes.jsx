import { useMemo } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CCheckboxes({
  label,
  size,
  required,
  error,
  helperText,
  name,
  value,
  options = [],
  col = 12,
  onChange,
}) {
  const colProps = useMemo(() => {
    if (typeof col === 'object') {
      return col;
    }
    return { xs: col };
  }, [col]);

  const handleChange = (e) => {
    if (!onChange) {
      return;
    }

    let newValue;
    if (e.target.checked) {
      newValue = [...value, e.target.value];
    } else {
      newValue = value.filter((v) => v !== e.target.value);
    }
    onChange({
      target: {
        name,
        value: newValue,
      },
    });
  };

  return (
    <FormControl
      fullWidth
      variant="standard"
      size={size}
      required={required}
      error={error}
    >
      {label && (
        <FormLabel sx={{ fontSize: '0.75em' }}>{label}</FormLabel>
      )}
      <Grid container columnSpacing={2}>
        {options.map((opt) => (
          <Grid key={opt.id} {...colProps}>
            <CCheckbox
              {...opt}
              key={opt.id}
              label={opt.name}
              name={name}
              value={opt.id}
              checked={value?.includes(opt.id) || false}
              onChange={handleChange}
            />
          </Grid>
        ))}
      </Grid>
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
}

export function CCheckbox({
  label,
  name,
  value,
  checked,
  onChange,
  ...props
}) {
  return (
    <FormControlLabel
      label={label}
      control={(
        <Checkbox
          {...props}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
        />
      )}
    />
  );
}
