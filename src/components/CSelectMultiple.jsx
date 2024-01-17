import { useMemo } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import FasIcon from '@/components/FasIcon.jsx';

export default function CSelectMultiple({
  options = [],
  name = '',
  value = [],
  label = '',
  required,
  size,
  error,
  helperText,
  onChange,
  ...props
}) {
  const inputValue = useMemo(() => {
    return typeof value === 'string' ? [value] : value;
  }, [value]);

  const handleClear = () => {
    onChange({
      target: {
        name,
        value: [],
      },
    });
  };

  return (
    <FormControl
      fullWidth
      size={size}
      required={required}
      error={error}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        {...props}
        name={name}
        value={inputValue}
        label={label}
        multiple
        endAdornment={inputValue.length ? (
          <InputAdornment position="end" sx={{ mr: 2 }}>
            <IconButton
              aria-label="toggle password visibility"
              size="small"
              onClick={handleClear}
            >
              <FasIcon name="fa-times" />
            </IconButton>
          </InputAdornment>
        ) : null}
        renderValue={(selected) => {
          const selectedOptions = options.filter((d) => selected.includes(d.id));
          return (
            <Stack direction="row" gap={1}>
              {selectedOptions.map((opt) => (
                <Chip key={opt.id} label={opt.name} size="small" />
              ))}
            </Stack>
          );
        }}
        onChange={onChange}
      >
        {!options.length && (
          <MenuItem value="" disabled>No options</MenuItem>
        )}
        {options.map((opt) => (
          <MenuItem key={opt.id} value={opt.id}>{opt.name}</MenuItem>
        ))}
      </Select>
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
