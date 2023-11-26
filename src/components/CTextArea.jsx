import TextField from '@mui/material/TextField';

export default function CTextArea({ error, ...props }) {
  return (
    <TextField
      {...props}
      multiline
      fullWidth
      minRows={3}
      error={Boolean(error)}
      helperText={error || props.helperText}
    />
  );
}
