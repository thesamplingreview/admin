import { Link } from 'react-router-dom';
import { appRoute } from '@/helpers/route';
import Button from '@mui/material/Button';
import CBox from '@/components/CBox.jsx';
import FasIcon from '@/components/FasIcon.jsx';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import ListTable from '@/components/pages/products/ListTable.jsx';

export default function ProductList() {
  return (
    <>
      <PageHeader
        title="Products"
        navs={[
          {
            name: 'Products',
            route: appRoute('/products'),
          },
          {
            name: 'All Products',
          },
        ]}
      >
        <Button
          component={Link}
          to={appRoute('/products/add')}
          variant="contained"
          color="primary"
          startIcon={<FasIcon name="fa-circle-plus" />}
        >
          New Product
        </Button>
      </PageHeader>

      <CBox noPadding mb={5}>
        <ListTable />
      </CBox>
    </>
  );
}
