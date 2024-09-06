import { appRoute } from '@/helpers/route';
import Grid from '@mui/material/Unstable_Grid2';
import { useModel } from '@/contexts/hooks/module';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import NavView from '@/components/pages/users/NavView.jsx';
import FormDelete from '@/components/pages/users/FormDelete.jsx';

export default function UserDelete() {
  const [model] = useModel();

  return (
    <>
      <PageHeader
        title={`User - ${model.name}`}
        navs={[
          {
            name: 'User',
            route: appRoute('/users'),
          },
          {
            name: 'Overview',
            route: appRoute(`/users/${model.id}`),
          },
          {
            name: 'Delete Entry',
          },
        ]}
      />

      <Grid container spacing={{ xs: 3, xl: 5 }}>
        <Grid lg={3}>
          <NavView active="delete" />
        </Grid>
        <Grid lg={9}>
          <FormDelete mb={5} />
        </Grid>
      </Grid>
    </>
  );
}
