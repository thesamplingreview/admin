import { useMemo } from 'react';
import classNames from 'classnames';
import Box from '@mui/material/Box';

export default function CError({
  children,
  message,
  fasIcon = '',
  full = false,
  fullOffset = '0px',
  ...props
}) {
  // calculate full props
  const fullProp = useMemo(() => {
    if (!full) {
      return {};
    }
    if (full === 'header') {
      return { minHeight: `calc(100vh - 3.75rem - ${fullOffset})` };
    }
    return { minHeight: `calc(100vh - ${fullOffset})` };
  }, [full, fullOffset]);

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      p={3}
      sx={fullProp}
      {...props}
    >
      <Box className='text-center'>
        {fasIcon && (
          <Box
            as='i'
            className={classNames('fas', fasIcon)}
            fontSize='2.5rem'
            color='text.light'
            mb={2}
          />
        )}

        <Box color='text.light'>
          {children || message || 'Internal error.'}
        </Box>
      </Box>
    </Box>
  );
}
