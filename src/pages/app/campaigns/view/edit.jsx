import { appRoute } from '@/helpers/route';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useModel } from '@/contexts/hooks/module';
import CBox from '@/components/CBox.jsx';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import NavView from '@/components/pages/campaigns/NavView.jsx';
import FormEdit from '@/components/pages/campaigns/FormEdit.jsx';

export default function CampaignEdit() {
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
            name: 'Edit Detail',
          },
        ]}
      />

      <Grid container spacing={5}>
        <Grid lg={3}>
          <NavView active="edit" />
        </Grid>
        <Grid lg={9}>
          {model.status === 'publish' && (
            <Box mb={3}>
              <Alert severity="warning">
                <AlertTitle>Warning</AlertTitle>
                You are editing PUBLISHED campaign right now.
              </Alert>
            </Box>
          )}

          <CBox title="Edit Entry" mb={5}>
            <FormEdit />
          </CBox>
        </Grid>
      </Grid>
    </>
  );
}
