import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FasIcon from '@/components/FasIcon.jsx';

export default function CBox({
  title = '',
  noPadding = false,
  show = true,
  toggleable = false,
  bodyProps = null,
  action = null,
  footer = null,
  children,
  ...props
}) {
  const [isShow, setIsShow] = useState(show);

  const internalBodyProps = {
    px: !noPadding ? { xs: 3, md: 4 } : 0,
    py: !noPadding ? { xs: 2, md: 3 } : 0,
    ...bodyProps,
  };

  const handleToggle = () => {
    if (toggleable) {
      setIsShow(!isShow);
    }
  };

  return (
    <Box
      boxShadow="var(--shadow-500)"
      borderRadius="12px"
      {...props}
    >
      {(title || action) && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px={{ sx: 3, md: 4 }}
          py={{ sx: 2, md: 3 }}
          borderBottom="1px solid var(--border-500)"
          onClick={handleToggle}
        >
          {title && (
            <Typography variant="h5">
              {title}
            </Typography>
          )}
          <Box display="flex" alignItems="center" gap={2} ml={3}>
            {action}
            {toggleable && (
              <Box my={-1} mr={-2}>
                <IconButton sx={{ fontSize: '1rem' }}>
                  <FasIcon name={isShow ? 'fa-chevron-up' : 'fa-chevron-down'} />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>
      )}
      {isShow && (
        <Box {...internalBodyProps}>
          {children}
        </Box>
      )}
      {footer && (
        <Box
          px={{ sx: 3, md: 4 }}
          py={{ sx: 2, md: 3 }}
          borderTop="1px solid var(--border-500)"
        >
          {footer}
        </Box>
      )}
    </Box>
  );
}
