import Grid from '@mui/material/Unstable_Grid2';
import { appRoute } from '@/helpers/route';
import { useModel } from '@/contexts/hooks/module';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import NavView from '@/components/pages/campaigns/NavView.jsx';
import ViewReport from '@/components/pages/campaigns/ViewReport.jsx';

export default function CampaignReport() {
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
            route: appRoute(`/campaigns/${model.id}`),
          },
          {
            name: 'Report',
          },
        ]}
      />

      <Grid container spacing={{ xs: 3, xl: 5 }}>
        <Grid lg={3}>
          <NavView active="report" />
        </Grid>
        <Grid lg={9}>
          <ViewReport mb={5} />
        </Grid>
      </Grid>
    </>
  );
}
