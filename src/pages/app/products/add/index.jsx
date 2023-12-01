import { appRoute } from '@/helpers/route';
import Grid from '@mui/material/Unstable_Grid2';
import CBox from '@/components/CBox.jsx';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import FormCreate from '@/components/pages/products/FormCreate.jsx';

export default function ProductAdd() {
  return (
    <>
      <PageHeader
        title="Add New Product"
        navs={[
          {
            name: 'Products',
            route: appRoute('/products'),
          },
          {
            name: 'New Products',
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
