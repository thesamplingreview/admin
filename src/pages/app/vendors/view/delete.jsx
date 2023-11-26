import { appRoute } from '@/helpers/route';
import Grid from '@mui/material/Unstable_Grid2';
import { useModel } from '@/contexts/hooks/module';
import CBox from '@/components/CBox.jsx';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import NavView from '@/components/vendors/NavView.jsx';
import FormDelete from '@/components/vendors/FormDelete.jsx';

export default function VendorDelete() {
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
            name: 'Delete Entry',
          },
        ]}
      />

      <Grid container spacing={5}>
        <Grid lg={3}>
          <NavView active="delete" />
        </Grid>
        <Grid lg={9}>
          <CBox title="Delete Entry" mb={5}>
            <FormDelete />
          </CBox>
        </Grid>
      </Grid>
    </>
  );
}
