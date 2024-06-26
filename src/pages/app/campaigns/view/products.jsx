import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { appRoute } from '@/helpers/route';
import { useOnce } from '@/helpers/hooks';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';
import { useModel } from '@/contexts/hooks/module';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import CLoader from '@/components/CLoader.jsx';
import NavView from '@/components/pages/campaigns/NavView.jsx';
import EditAlert from '@/components/pages/campaigns/EditAlert.jsx';
import FormProducts from '@/components/pages/campaigns/FormProducts';

export default function CampaignProducts() {
  const doFetch = useFetch();
  const [model] = useModel();
  const endpointGet = useRoleEndpoint(`/forms/${model.form_id}`);
  const [loading, setLoading] = useState(true);
  const [formFields, setFormFields] = useState([]);

  // fetch form detail, need form's fields info
  const fetchForm = async () => {
    setLoading(true);
    try {
      const { code, data } = await doFetch(endpointGet);
      if (code !== 200) {
        throw new Error('API error');
      }
      setFormFields(data?.fields || []);
    } catch (err) {
      // ...
    }
    setLoading(false);
  };

  useOnce(() => {
    if (model.form_id) {
      fetchForm();
    } else {
      setLoading(false);
    }
  });

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
            name: 'Products',
          },
        ]}
      />

      <Grid container spacing={{ xs: 3, xl: 5 }}>
        <Grid lg={3}>
          <NavView active="products" />
        </Grid>
        <Grid lg={9}>
          {loading && (
            <CLoader py={5} />
          )}
          {!loading && (
            <>
              <EditAlert />
              <FormProducts formFields={formFields} mb={5} />
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}
