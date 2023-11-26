import { appRoute } from '@/helpers/route';
import Grid from '@mui/material/Unstable_Grid2';
import { useModel } from '@/contexts/hooks/module';
import CBox from '@/components/CBox.jsx';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import NavView from '@/components/forms/NavView.jsx';
import { FormBuilder } from '@/components/forms/FormBuilder';

export default function FormEditPage() {
  const [model] = useModel();
  console.log(model);

  return (
    <>
      <PageHeader
        title={`Form - ${model.name}`}
        navs={[
          {
            name: 'All Forms',
            route: appRoute('/forms'),
          },
          {
            route: appRoute(`/forms/${model.id}`),
            name: 'Form Detail',
          },
          {
            name: 'Form Fields',
          },
        ]}
      />

      <Grid container spacing={5}>
        <Grid lg={3}>
          <NavView active="fields" />
        </Grid>
        <Grid lg={9}>
          <CBox
            title="Form Builder"
            bodyProps={{ px: 0, py: 0 }}
            mb={5}
          >
            <FormBuilder defaultValue={model.fields} />
          </CBox>
        </Grid>
      </Grid>
    </>
  );
}
