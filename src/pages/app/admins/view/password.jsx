import { appRoute } from '@/helpers/route';
import Grid from '@mui/material/Unstable_Grid2';
import { useModel } from '@/contexts/hooks/module';
import CBox from '@/components/CBox.jsx';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import NavView from '@/components/pages/admins/NavView.jsx';
import FormPassword from '@/components/pages/admins/FormPassword.jsx';

export default function AdminPassword() {
  const [model] = useModel();

  return (
    <>
      <PageHeader
        title={`Admin - ${model.name}`}
        navs={[
          {
            name: 'Admins',
            route: appRoute('/admins'),
          },
          {
            name: 'Edit Detail',
            route: appRoute(`/admins/${model.id}`),
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
          <CBox title="Edit Password" mb={5}>
            <FormPassword />
          </CBox>
        </Grid>
      </Grid>
    </>
  );
}
