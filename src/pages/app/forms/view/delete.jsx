import { appRoute } from '@/helpers/route';
import Grid from '@mui/material/Unstable_Grid2';
import { useModel } from '@/contexts/hooks/module';
import CBox from '@/components/CBox.jsx';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import NavView from '@/components/forms/NavView.jsx';
import FormDelete from '@/components/forms/FormDelete.jsx';

export default function FormDeletePage() {
  const [model] = useModel();

  return (
    <>
      <PageHeader
        title={`Form - ${model.name}`}
        navs={[
          {
            name: 'All Forms',
            route: appRoute('/forms'),
          },
          {
            name: 'Form Detail',
            route: appRoute(`/forms/${model.id}`),
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
