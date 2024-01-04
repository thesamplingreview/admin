import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { appRoute } from '@/helpers/route';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import FasIcon from '@/components/FasIcon.jsx';
import PageHeader from '@/components/layouts/PageHeader.jsx';

export default function SystemHome() {
  const navs = useMemo(() => ([
    {
      key: 'email_template',
      name: 'Email Templates',
      desc: 'Setup Sendgrid email template mapping.',
      href: appRoute('/system/email-template'),
      icon: 'fa-envelopes-bulk',
    },
  ]), []);

  return (
    <>
      <PageHeader
        title="System Settings"
        navs={[
          {
            name: 'System',
            route: appRoute('/system'),
          },
          {
            name: 'System Settings',
          },
        ]}
      />

      <Grid container spacing={3}>
        {navs.map((nav) => (
          <Grid key={nav.key} xs={12} sm={6} md={4}>
            <Box
              component={Link}
              to={nav.href}
              display="flex"
              alignItems="center"
              boxShadow="var(--shadow-500)"
              borderRadius="12px"
              bgcolor="#fff"
              color="text.main"
              px={3}
              py={2}
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <Box fontSize="1.75em" mr={2} sx={{ opacity: '.75' }}>
                <FasIcon name={nav.icon} />
              </Box>
              <Box flexGrow="1">
                <Typography variant="h6">
                  {nav.name}
                </Typography>
                <Typography variant="body2" sx={{ opacity: '.65' }}>
                  {nav.desc}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
