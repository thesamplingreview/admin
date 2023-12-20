import Grid from '@mui/material/Unstable_Grid2';
import { useModel } from '@/contexts/hooks/module';
import { appRoute } from '@/helpers/route';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import NavView from '@/components/pages/users/NavView.jsx';
import ViewCampaigns from '@/components/pages/users/ViewCampaigns.jsx';

export default function UserOverview() {
  const [model] = useModel();

  return (
    <>
      <PageHeader
        title={`User - ${model.name}`}
        navs={[
          {
            name: 'Users',
            route: appRoute('/users'),
          },
          {
            name: 'Overview',
            route: appRoute(`/users/${model.id}`),
          },
          {
            name: 'My Campaigns',
          },
        ]}
      />

      <Grid container spacing={5}>
        <Grid lg={3}>
          <NavView active="campaigns" />
        </Grid>
        <Grid lg={9}>
          <ViewCampaigns mb={5} />
        </Grid>
      </Grid>
    </>
  );
}
