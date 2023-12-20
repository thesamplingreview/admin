import Grid from '@mui/material/Unstable_Grid2';
import { useModel } from '@/contexts/hooks/module';
import { appRoute } from '@/helpers/route';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import NavView from '@/components/pages/campaigns/NavView.jsx';
import ViewDetail from '@/components/pages/campaigns/ViewDetail.jsx';
// import ViewStats from '@/components/pages/campaigns/ViewStats.jsx';

export default function CampaignOverview() {
  const [model] = useModel();

  return (
    <>
      <PageHeader
        title={`Campaign - ${model.name}`}
        navs={[
          {
            name: 'Campaigns',
            route: appRoute('/campaigns'),
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
          {/* <ViewStats modelId={model.id} mb={4} /> */}
          <ViewDetail mb={5} />
        </Grid>
      </Grid>
    </>
  );
}
