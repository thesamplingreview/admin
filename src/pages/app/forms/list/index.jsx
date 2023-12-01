import { Link } from 'react-router-dom';
import { appRoute } from '@/helpers/route';
import Button from '@mui/material/Button';
import CBox from '@/components/CBox.jsx';
import FasIcon from '@/components/FasIcon.jsx';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import ListTable from '@/components/pages/forms/ListTable.jsx';

export default function FormList() {
  return (
    <>
      <PageHeader
        title="Forms"
        navs={[
          {
            name: 'All Forms',
            route: appRoute('/Forms'),
          },
          {
            name: 'Forms',
          },
        ]}
      >
        <Button
          component={Link}
          to={appRoute('/forms/add')}
          variant="contained"
          color="primary"
          startIcon={<FasIcon name="fa-rectangle-list" />}
        >
          New Form
        </Button>
      </PageHeader>

      <CBox noPadding mb={5}>
        <ListTable />
      </CBox>
    </>
  );
}
