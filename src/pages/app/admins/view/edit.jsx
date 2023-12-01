import { appRoute } from '@/helpers/route';
import Grid from '@mui/material/Unstable_Grid2';
import { useModel } from '@/contexts/hooks/module';
import CBox from '@/components/CBox.jsx';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import NavView from '@/components/pages/admins/NavView.jsx';
import FormEdit from '@/components/pages/admins/FormEdit.jsx';

export default function AdminEdit() {
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
