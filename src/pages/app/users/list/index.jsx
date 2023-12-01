import { Link } from 'react-router-dom';
import { appRoute } from '@/helpers/route';
import Button from '@mui/material/Button';
import CBox from '@/components/CBox.jsx';
import FasIcon from '@/components/FasIcon.jsx';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import ListTable from '@/components/pages/users/ListTable.jsx';

export default function UserList() {
  return (
    <>
      <PageHeader
        title="Users"
        navs={[
          {
            name: 'Users',
            route: appRoute('/users'),
          },
          {
            name: 'All Users',
          },
        ]}
      >
        <Button
          component={Link}
          to={appRoute('/users/add')}
          variant="contained"
          color="primary"
          startIcon={<FasIcon name="fa-user-plus" />}
        >
          Add User
        </Button>
      </PageHeader>

      <CBox noPadding mb={5}>
        <ListTable />
      </CBox>
    </>
  );
}
