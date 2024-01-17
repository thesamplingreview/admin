import Grid from '@mui/material/Unstable_Grid2';
import { appRoute } from '@/helpers/route';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import NavView from '@/components/pages/my/NavView.jsx';
import FormProfile from '@/components/pages/my/FormProfile.jsx';

export default function MyProfile() {
  return (
    <>
      <PageHeader
        title="My Profile"
        navs={[
          {
            name: 'My profile',
            route: appRoute('/my/profile'),
          },
          {
            name: 'Edit profile',
          },
        ]}
      />

      <Grid container spacing={5}>
        <Grid lg={3}>
          <NavView active="profile" />
        </Grid>
        <Grid lg={9}>
          <FormProfile mb={5} />
        </Grid>
      </Grid>
    </>
  );
}
