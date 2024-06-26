import { Link } from 'react-router-dom';
import { appRoute } from '@/helpers/route';
import { usePermissions } from '@/contexts/hooks/auth';
import Button from '@mui/material/Button';
import CBox from '@/components/CBox.jsx';
import FasIcon from '@/components/FasIcon.jsx';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import ListTable from '@/components/pages/admins/ListTable.jsx';

export default function AdminList() {
  const [permissions] = usePermissions();

  return (
    <>
      <PageHeader
        title="Admins"
        navs={[
          {
            name: 'Admins',
            route: appRoute('/admins'),
          },
          {
            name: 'All Admins',
          },
        ]}
      >
        {permissions.includes('admins:create') && (
          <Button
            component={Link}
            to={appRoute('/admins/add')}
            variant="contained"
            color="primary"
            startIcon={<FasIcon name="fa-user-plus" />}
          >
            Add Admin
          </Button>
        )}
      </PageHeader>

      <CBox noPadding mb={5}>
        <ListTable />
      </CBox>
    </>
  );
}
