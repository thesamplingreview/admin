import { useRef, useState } from 'react';
import { toFormData } from '@/helpers/utils';
import { useFetch } from '@/contexts/hooks/auth';
import Box from '@mui/material/Box';
import FasIcon from './FasIcon.jsx';

export default function CInputUpload({
  name,
  value,
  maxSize = 4,
  extensions = ['jpg', 'jpeg', 'png', 'webp'],
  accept = ['image/*'],
  tags = 'admin',
  clearable = false,
  error,
  onChange,
  ...props
}) {
  const doFetch = useFetch();
  const $file = useRef(null);

  const [loading, setLoading] = useState(false);

  const triggerChange = (newVal) => {
    onChange({
      target: {
        name,
        value: newVal,
      },
    });
  };

  const triggerError = (newError) => {
    // @temp
    // eslint-disable-next-line no-alert
    window.alert(newError);
  };

  const doUpload = async (file) => {
    setLoading(true);
    try {
      const formdata = {
        file,
        tags,
      };
      const { data } = await doFetch('/v1/utils/upload-asset', {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: toFormData(formdata),
      });
      if (!data.url) {
        throw new Error('Unable to upload.');
      }
      triggerChange(data.url);
    } catch (err) {
      triggerError(err.message);
    }
    setLoading(false);
  };

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

  const handleClick = () => {
    $file.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const hasErr = validate(file);
    if (hasErr) {
      triggerError(hasErr.message);
      return;
    }

    // perform upload
    doUpload(file);
  };

  const handleClear = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure want to remove image?')) {
      triggerChange('');
    }
  };

  return (
    <Box
      {...props}
      position="relative"
      borderRadius=".5rem"
      bgcolor="var(--bg-500)"
      sx={[
        {
          width: '100%',
          pb: '100%',
          transition: 'opacity .3s',
          '& input[type=file]': {
            position: 'absolute',
            top: 0,
            left: -9999,
            opacity: 0,
          },
          '&:hover': {
            opacity: 0.75,
            '& .clear': {
              opacity: 1,
            },
          },
        },
        loading && {
          pointerEvents: 'none',
        },
      ]}
    >
      {/* input */}
      <input
        ref={$file}
        type="file"
        accept={accept.join(',')}
        onChange={handleChange}
      />

      {/* clearable */}
      {clearable && value && (
        <Box
          className="clear"
          position="absolute"
          zIndex="5"
          top="0"
          right="0"
          width="1.5em"
          height="1.5em"
          fontSize="0.75em"
          bgcolor="#000"
          color="#fff"
          borderRadius="50%"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            opacity: 0,
            transform: 'translate(15%, -15%)',
          }}
          onClick={handleClear}
        >
          <FasIcon name="fa-times" />
        </Box>
      )}

      {/* content */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        overflow="hidden"
        borderRadius="inherit"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ cursor: 'pointer' }}
        onClick={handleClick}
      >
        {value && (
          <Box
            component="img"
            src={value}
            alt=""
            loading="lazy"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        )}
        {!value && (
          <FasIcon name="fa-image" color="text.light" />
        )}

        {loading && (
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="#fff"
            sx={{ opacity: 0.5 }}
          >
            <FasIcon name="fa-spinner fa-spin" />
          </Box>
        )}
      </Box>
    </Box>
  );
}
