import { appRoute } from '@/helpers/route';
import Grid from '@mui/material/Unstable_Grid2';
import { useModel } from '@/contexts/hooks/module';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import NavView from '@/components/pages/forms/NavView.jsx';
import EditAlert from '@/components/pages/forms/EditAlert.jsx';
import FormFields from '@/components/pages/forms/FormFields.jsx';

export default function FormEditPage() {
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
            route: appRoute(`/forms/${model.id}`),
            name: 'Form Detail',
          },
          {
            name: 'Form Fields',
          },
        ]}
      />

      <Grid container spacing={5}>
        <Grid lg={3}>
          <NavView active="fields" />
        </Grid>
        <Grid lg={9}>
          <EditAlert />
          <FormFields mb={5} />
        </Grid>
      </Grid>
    </>
  );
}
