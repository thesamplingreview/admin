import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useAuthCheck } from '@/contexts/hooks/auth';
import { LayoutProvider } from '@/contexts/LayoutContext.jsx';
import { authRoute } from '@/helpers/route';
import CLoader from '@/components/CLoader.jsx';
import AppSidenav from '@/components/layouts/AppSidenav.jsx';
import AppHeader from '@/components/layouts/AppHeader.jsx';

export default function AdminLayout() {
  const navigate = useNavigate();
  const { isAuth, loading, error } = useAuthCheck();

  // auth protected
  useEffect(() => {
    if (!loading && (!isAuth || error)) {
      navigate(authRoute('/login'));
    }
  }, [navigate, isAuth, loading, error]);

  if (loading || error) {
    return <CLoader full />;
  }
  return (
    <LayoutProvider>
      <Box
        display="flex"
        width="100%"
        minHeight="100vh"
      >
        <AppSidenav />

        <Box flexGrow="1" minWidth="1px">
          <AppHeader />
          <Box px={{ xs: 3, md: 4, lg: 5 }} py={3}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </LayoutProvider>
  );
}
