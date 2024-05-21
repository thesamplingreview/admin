import { appRoute } from '@/helpers/route';
import Grid from '@mui/material/Unstable_Grid2';
import { useModel } from '@/contexts/hooks/module';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import NavView from '@/components/pages/campaigns/NavView.jsx';
import EditAlert from '@/components/pages/campaigns/EditAlert.jsx';
import FormSetting from '@/components/pages/campaigns/FormSetting.jsx';

export default function CampaignSetting() {
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
            name: 'Campaign Setting',
          },
        ]}
      />

      <Grid container spacing={{ xs: 3, xl: 5 }}>
        <Grid lg={3}>
          <NavView active="setting" />
        </Grid>
        <Grid lg={9}>
          <EditAlert />
          <FormSetting mb={5} />
        </Grid>
      </Grid>
    </>
  );
}
