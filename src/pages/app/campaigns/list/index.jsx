import { Link } from 'react-router-dom';
import { appRoute } from '@/helpers/route';
import { usePermissions } from '@/contexts/hooks/auth';
import Button from '@mui/material/Button';
import FasIcon from '@/components/FasIcon.jsx';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import ListTable from '@/components/pages/campaigns/ListTable.jsx';

export default function CampaignList() {
  const [permissions] = usePermissions();

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
        {permissions.includes('campaigns:create') && (
          <Button
            component={Link}
            to={appRoute('/campaigns/add')}
            variant="contained"
            color="primary"
            startIcon={<FasIcon name="fa-fire" />}
          >
            New Campaign
          </Button>
        )}
      </PageHeader>

      <ListTable mb={5} />
    </>
  );
}
