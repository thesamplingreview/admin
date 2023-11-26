import Grid from '@mui/material/Unstable_Grid2';
import { useModel } from '@/contexts/hooks/module';
import { appRoute } from '@/helpers/route';
import CBox from '@/components/CBox.jsx';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import NavView from '@/components/products/NavView.jsx';
import ViewDetail from '@/components/products/ViewDetail.jsx';

export default function ProductOverview() {
  const [model] = useModel();

  return (
    <>
      <PageHeader
        title={`Product - ${model.name}`}
        navs={[
          {
            name: 'Products',
            route: appRoute('/products'),
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
