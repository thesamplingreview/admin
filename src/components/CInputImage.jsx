import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { MuiFileInput } from 'mui-file-input';
import { useUpdated } from '@/helpers/hooks';
import FasIcon from './FasIcon.jsx';

export default function CInputFile({
  name,
  value,
  defaultValue,
  maxSize = 4,
  extensions = ['jpg', 'jpeg', 'png', 'webp'],
  accept = ['image/*'],
  error,
  onChange,
  ...props
}) {
  const [preview, setPreview] = useState('');
  const [internalError, setInternalError] = useState('');

  const validate = (file) => {
    // extension check
    const ext = file.name.split('.').pop().toLowerCase();
    if (!extensions.includes(ext)) {
      return new Error(`Only allow ${extensions.join(', ')}`);
    }
    // file size check
    if (file.size > maxSize * 1024 * 1024) {
      return new Error(`Max file size ${maxSize}Mb`);
    }
    return false;
  };

  const handleChange = (newVal) => {
    if (!newVal) {
      onChange({
        target: { name, value: null },
      });
      return;
    }

    const hasErr = validate(newVal);
    if (hasErr) {
      setInternalError(hasErr.message);
      // reset value
      onChange({
        target: { name, value: null },
      });
    } else {
      setInternalError(null);
      onChange({
        target: { name, value: newVal },
      });
    }
  };

  useUpdated(() => {
    if (value) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(value);
    } else {
      setPreview('');
    }
  }, [value]);

  return (
    <Grid container spacing={4}>
      <Grid md={8} lg={7}>
        <MuiFileInput
          {...props}
          InputProps={{
            ...props.inputProps,
            inputProps: {
              accept,
            },
            startAdornment: <FasIcon name="fa-image" />,
          }}
          fullWidth
          error={Boolean(internalError) || Boolean(error)}
          helperText={internalError || error || props.helperText}
          value={value}
          onChange={handleChange}
        />
      </Grid>
      <Grid md={4} lg={5}>
        {(preview || defaultValue) && (
          <Box
            component="img"
            src={preview || defaultValue}
            alt=""
            width="400"
            height="400"
            sx={{
              borderRadius: '4px',
              width: '100%',
              height: 'auto',
            }}
          />
        )}
      </Grid>
    </Grid>
  );
}
