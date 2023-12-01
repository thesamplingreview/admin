import { appRoute } from '@/helpers/route';
import Grid from '@mui/material/Unstable_Grid2';
import CBox from '@/components/CBox.jsx';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import FormCreate from '@/components/pages/vendors/FormCreate.jsx';

export default function VendorAdd() {
  return (
    <>
      <PageHeader
        title="New Vendor"
        navs={[
          {
            name: 'Vendors',
            route: appRoute('/vendors'),
          },
          {
            name: 'New Vendor',
          },
        ]}
      />

      <Grid container spacing={5}>
        <Grid lg={3}>

        </Grid>
        <Grid lg={9}>
          <CBox title="New Entry" mb={5}>
            <FormCreate />
          </CBox>
        </Grid>
      </Grid>
    </>
  );
}
