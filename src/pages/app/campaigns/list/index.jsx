import { Link } from 'react-router-dom';
import { appRoute } from '@/helpers/route';
import Button from '@mui/material/Button';
import FasIcon from '@/components/FasIcon.jsx';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import ListTable from '@/components/pages/campaigns/ListTable.jsx';

export default function CampaignList() {
  return (
    <>
      <PageHeader
        title="Campaigns"
        navs={[
          {
            name: 'Campaigns',
            route: appRoute('/campaigns'),
          },
          {
            name: 'All Campaigns',
          },
        ]}
      >
        <Button
          component={Link}
          to={appRoute('/campaigns/add')}
          variant="contained"
          color="primary"
          startIcon={<FasIcon name="fa-fire" />}
        >
          New Campaign
        </Button>
      </PageHeader>

      <ListTable mb={5} />
    </>
  );
}
