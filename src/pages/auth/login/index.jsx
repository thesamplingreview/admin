import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import SplashCover from '@/components/layouts/SplashCover.jsx';
import LoginForm from '@/components/pages/auth/LoginForm.jsx';
import { useAuth } from '@/contexts/hooks/auth';
import { useOnce } from '@/helpers/hooks';
import { appRoute } from '@/helpers/route';

export default function LoginPage() {
  const navigate = useNavigate();
  const [auth] = useAuth();

  useOnce(() => {
    if (auth) {
      navigate(appRoute('/dashboard'));
    }
  });

  return (
    <Grid container spacing={0} height="100vh">
      <Grid xs lg={5}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          height="100%"
        >
          <LoginForm />
        </Box>
      </Grid>
      <Grid xs lg={7} position="relative">
        <SplashCover />
      </Grid>
    </Grid>
  );
}
