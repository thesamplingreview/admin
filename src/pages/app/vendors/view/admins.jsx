import Grid from '@mui/material/Unstable_Grid2';
import { useModel } from '@/contexts/hooks/module';
import { appRoute } from '@/helpers/route';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import NavView from '@/components/pages/vendors/NavView.jsx';
import ViewAdmins from '@/components/pages/vendors/ViewAdmins.jsx';

export default function VendorAdmins() {
  const [model] = useModel();

  return (
    <>
      <PageHeader
        title={`Vendor - ${model.name}`}
        navs={[
          {
            name: 'Vendors',
            route: appRoute('/vendors'),
          },
          {
            name: 'Overview',
            route: appRoute(`/vendors/${model.id}`),
          },
          {
            name: 'Admins',
          },
        ]}
      />

      <Grid container spacing={5}>
        <Grid lg={3}>
          <NavView active="admins" />
        </Grid>
        <Grid lg={9}>
          <ViewAdmins mb={5} />
        </Grid>
      </Grid>
    </>
  );
}
