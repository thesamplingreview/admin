import TextField from '@mui/material/TextField';

export default function CTextArea({ error, ...props }) {
  return (
    <TextField
      {...props}
      fullWidth
      multiline
      minRows={3}
      error={Boolean(error)}
      helperText={error || props.helperText}
    />
  );
}
