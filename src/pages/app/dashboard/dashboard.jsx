import Grid from '@mui/material/Unstable_Grid2';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import WidgetEnrolmentChart from '@/components/pages/dashboard/WidgetEnrolmentChart.jsx';
import WidgetSignupChart from '@/components/pages/dashboard/WidgetSignupChart.jsx';
import WidgetEnrolments from '@/components/pages/dashboard/WidgetEnrolments.jsx';

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        navs={[
          {
            name: 'Dashboard',
          },
        ]}
      />

      <Grid container spacing={3}>
        <Grid xs={12} lg={8}>
          <WidgetEnrolmentChart />
        </Grid>
        <Grid xs={12} lg={4}>
          <WidgetEnrolments />
        </Grid>
        <Grid xs={12} lg={8}>
          <WidgetSignupChart />
        </Grid>
      </Grid>
    </>
  );
}
