import { Link } from 'react-router-dom';
import { appRoute } from '@/helpers/route';
import Button from '@mui/material/Button';
import CBox from '@/components/CBox.jsx';
import FasIcon from '@/components/FasIcon.jsx';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import ListTable from '@/components/vendors/ListTable.jsx';

export default function VendorList() {
  return (
    <>
      <PageHeader
        title="Vendors"
        navs={[
          {
            name: 'Vendors',
            route: appRoute('/vendors'),
          },
          {
            name: 'All Vendors',
          },
        ]}
      >
        <Button
          component={Link}
          to={appRoute('/vendors/add')}
          variant="contained"
          color="primary"
          startIcon={<FasIcon name="fa-shop" />}
        >
          Add Vendor
        </Button>
      </PageHeader>

      <CBox noPadding mb={5}>
        <ListTable />
      </CBox>
    </>
  );
}
