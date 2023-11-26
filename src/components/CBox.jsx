import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function CBox({
  title,
  noPadding = false,
  bodyProps,
  children,
  ...props
}) {
  const internalBodyProps = {
    px: !noPadding ? { xs: 3, md: 4 } : 0,
    py: !noPadding ? { xs: 2, md: 3 } : 0,
    ...bodyProps,
  };

  return (
    <Box
      boxShadow="var(--shadow-500)"
      borderRadius="12px"
      {...props}
    >
      {title && (
        <Box
          px={{ sx: 3, md: 4 }}
          py={{ sx: 2, md: 3 }}
          borderBottom="1px solid var(--border-500)"
        >
          <Typography variant="h5">
            {title}
          </Typography>
        </Box>
      )}
      <Box {...internalBodyProps}>
        {children}
      </Box>
    </Box>
  );
}
