import { appRoute } from '@/helpers/route';
import Grid from '@mui/material/Unstable_Grid2';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import FormCreate from '@/components/pages/campaigns/FormCreate.jsx';

export default function VendorAdd() {
  return (
    <>
      <PageHeader
        title="New Campaign"
        navs={[
          {
            name: 'Campaigns',
            route: appRoute('/campaigns'),
          },
          {
            name: 'New Campaign',
          },
        ]}
      />

      <Grid container spacing={5}>
        <Grid lg={3}>

        </Grid>
        <Grid lg={9}>
          <FormCreate mb={5} />
        </Grid>
      </Grid>
    </>
  );
}
