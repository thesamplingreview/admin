import Grid from '@mui/material/Unstable_Grid2';
import { useModel } from '@/contexts/hooks/module';
import { appRoute } from '@/helpers/route';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import NavView from '@/components/pages/campaigns/NavView.jsx';
import ViewReviews from '@/components/pages/campaigns/ViewReviews.jsx';

export default function CampaignReviews() {
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
            name: 'Reviews',
          },
        ]}
      />

      <Grid container spacing={5}>
        <Grid lg={3}>
          <NavView active="reviews" />
        </Grid>
        <Grid lg={9}>
          <ViewReviews mb={5} />
        </Grid>
      </Grid>
    </>
  );
}
