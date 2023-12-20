import { appRoute } from '@/helpers/route';
import Grid from '@mui/material/Unstable_Grid2';
import { useModel } from '@/contexts/hooks/module';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import NavView from '@/components/pages/enrolments/NavView.jsx';
import FormDelete from '@/components/pages/enrolments/FormDelete.jsx';

export default function CampaignDelete() {
  const [model] = useModel();

  return (
    <>
      <PageHeader
        title={`Enrolment - #${model.id}`}
        navs={[
          {
            name: 'Enrolments',
            route: appRoute('/enrolments'),
          },
          {
            name: 'Overview',
            route: appRoute(`/enrolments/${model.id}`),
          },
          {
            name: 'Delete Entry',
          },
        ]}
      />

      <Grid container spacing={{ xs: 3, xl: 5 }}>
        <Grid lg={3}>
          <NavView active="delete" />
        </Grid>
        <Grid lg={9}>
          <FormDelete mb={5} />
        </Grid>
      </Grid>
    </>
  );
}
