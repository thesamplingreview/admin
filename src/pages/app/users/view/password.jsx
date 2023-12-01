import { appRoute } from '@/helpers/route';
import Grid from '@mui/material/Unstable_Grid2';
import { useModel } from '@/contexts/hooks/module';
import CBox from '@/components/CBox.jsx';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import NavView from '@/components/pages/users/NavView.jsx';
import FormPassword from '@/components/pages/users/FormPassword.jsx';

export default function UserPassword() {
  const [model] = useModel();

  return (
    <>
      <PageHeader
        title={`User - ${model.name}`}
        navs={[
          {
            name: 'Users',
            route: appRoute('/users'),
          },
          {
            name: 'Overview',
            route: appRoute(`/users/${model.id}`),
          },
          {
            name: 'Change Password',
          },
        ]}
      />

      <Grid container spacing={5}>
        <Grid lg={3}>
          <NavView active="password" />
        </Grid>
        <Grid lg={9}>
          <CBox title="Reset Password" mb={5}>
            <FormPassword />
          </CBox>
        </Grid>
      </Grid>
    </>
  );
}
