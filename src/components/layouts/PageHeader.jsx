import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function PageHeader({
  title,
  navs = [],
  children,
}) {
  return (
    <Box
      component="header"
      display="flex"
      alignItems="flex-end"
      justifyContent="space-between"
      mb={4}
    >
      <Box flexGrow="1">
        {/* breadcrumbs */}
        {navs.length > 0 && (
          <Box
            component="nav"
            display="flex"
            alignItems="center"
            fontSize="0.85rem"
            color="text.light"
            mb={1}
          >
            {navs.map((nav, index) => (
              <Fragment key={index}>
                {index > 0 && (
                  <Box variant="inherit" component="span" mx={1.5}>/</Box>
                )}

                {nav.route && (
                  <Box
                    component={Link}
                    to={nav.route}
                    sx={{
                      textDecoration: 'none',
                      color: 'text.light',
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    {nav.name}
                  </Box>
                )}
                {!nav.route && (
                  <Typography variant="inherit" color="primary.main" fontWeight="500">
                    {nav.name}
                  </Typography>
                )}
              </Fragment>
            ))}
          </Box>
        )}

        {/* title */}
        <Typography variant="h1" mb={0}>{title}</Typography>
      </Box>

      {/* cta */}
      {children && (
        <Box ml="auto">
          {children}
        </Box>
      )}
    </Box>
  );
}
