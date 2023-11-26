import { appRoute } from '@/helpers/route';
import Grid from '@mui/material/Unstable_Grid2';
import { useModel } from '@/contexts/hooks/module';
import CBox from '@/components/CBox.jsx';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import NavView from '@/components/vendors/NavView.jsx';
import FormEdit from '@/components/vendors/FormEdit.jsx';

export default function VendorEdit() {
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
