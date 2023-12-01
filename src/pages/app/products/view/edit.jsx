import Grid from '@mui/material/Unstable_Grid2';
import { useModel } from '@/contexts/hooks/module';
import { appRoute } from '@/helpers/route';
import CBox from '@/components/CBox.jsx';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import NavView from '@/components/pages/products/NavView.jsx';
import FormEdit from '@/components/pages/products/FormEdit.jsx';

export default function ProductEdit() {
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
            route: appRoute(`/products/${model.id}`),
          },
          {
            name: 'Edit Detail',
          },
        ]}
      />

      <Grid container spacing={5}>
        <Grid lg={3}>
          <NavView active="edit" />
        </Grid>
        <Grid lg={9}>
          <CBox title="Edit Entry" mb={5}>
            <FormEdit />
          </CBox>
        </Grid>
      </Grid>
    </>
  );
}
