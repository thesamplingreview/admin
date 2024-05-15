import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';

export default function CSelect({
  options = [],
  label = '',
  required,
  placeholder,
  size,
  error,
  helperText,
  displayEmpty,
  ...props
}) {
  const forceShrink = displayEmpty ? true : undefined;
  return (
    <FormControl
      fullWidth
      size={size}
      required={required}
      error={error}
    >
      <InputLabel shrink={forceShrink}>{label}</InputLabel>
      <Select
        {...props}
        label={label}
        notched={forceShrink}
        displayEmpty={displayEmpty}
      >
        {placeholder && (
          <MenuItem value="">{placeholder}</MenuItem>
        )}
        {options.map((opt) => (
          <MenuItem key={opt.id} value={opt.id} disabled={Boolean(opt.disabled)}>
            {opt.name}
          </MenuItem>
        ))}
      </Select>
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
