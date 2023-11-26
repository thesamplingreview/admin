import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';

export default function CSwitch({
  label = '',
  required,
  size,
  error,
  helperText,
  ...props
}) {
  return (
    <FormControl
      fullWidth
      size={size}
      required={required}
      error={error}
    >
      <FormControlLabel
        control={<Switch {...props} />}
        label={label}
        sx={{ py: 1 }}
      />
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
