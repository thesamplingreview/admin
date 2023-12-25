import { useNavigate, Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useAuth } from '@/contexts/hooks/auth';
import { LayoutProvider } from '@/contexts/LayoutContext.jsx';
import { authRoute } from '@/helpers/route';
import { useOnce } from '@/helpers/hooks';
import CLoader from '@/components/CLoader.jsx';
import AppHeader from '@/components/layouts/AppHeader.jsx';
import AppSidenav from '@/components/layouts/AppSidenav.jsx';

export default function AdminLayout() {
  const navigate = useNavigate();
  const [auth] = useAuth();

  // auth protected
  useOnce(() => {
    if (!auth) {
      navigate(authRoute('/login'));
    }
  });

  if (!auth) {
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
