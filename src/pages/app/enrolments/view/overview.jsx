import Grid from '@mui/material/Unstable_Grid2';
import { useModel } from '@/contexts/hooks/module';
import { appRoute } from '@/helpers/route';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import NavView from '@/components/pages/enrolments/NavView.jsx';
import ViewDetail from '@/components/pages/enrolments/ViewDetail.jsx';

export default function CampaignOverview() {
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
          },
        ]}
      />

      <Grid container spacing={{ xs: 3, xl: 5 }}>
        <Grid lg={3}>
          <NavView active="overview" />
        </Grid>
        <Grid lg={9}>
          <ViewDetail mb={5} />
        </Grid>
      </Grid>
    </>
  );
}
