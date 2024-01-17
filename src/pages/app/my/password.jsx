import Grid from '@mui/material/Unstable_Grid2';
import { appRoute } from '@/helpers/route';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import NavView from '@/components/pages/my/NavView.jsx';
import FormPassword from '@/components/pages/my/FormPassword.jsx';

export default function MyPassword() {
  return (
    <>
      <PageHeader
        title="My Password"
        navs={[
          {
            name: 'My profile',
            route: appRoute('/my/profile'),
          },
          {
            name: 'Change password',
          },
        ]}
      />

      <Grid container spacing={5}>
        <Grid lg={3}>
          <NavView active="password" />
        </Grid>
        <Grid lg={9}>
          <FormPassword mb={5} />
        </Grid>
      </Grid>
    </>
  );
}
