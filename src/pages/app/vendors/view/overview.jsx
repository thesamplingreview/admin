import Grid from '@mui/material/Unstable_Grid2';
import { useModel } from '@/contexts/hooks/module';
import { appRoute } from '@/helpers/route';
import CBox from '@/components/CBox.jsx';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import NavView from '@/components/vendors/NavView.jsx';
import ViewDetail from '@/components/vendors/ViewDetail.jsx';

export default function VendorOverview() {
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
          },
        ]}
      />

      <Grid container spacing={5}>
        <Grid lg={3}>
          <NavView active="overview" />
        </Grid>
        <Grid lg={9}>
          <CBox title="Entry Detail" mb={5}>
            <ViewDetail />
          </CBox>
        </Grid>
      </Grid>
    </>
  );
}
