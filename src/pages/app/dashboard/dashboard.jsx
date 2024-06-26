import { usePermissions } from '@/contexts/hooks/auth';
import Grid from '@mui/material/Unstable_Grid2';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import WidgetEnrolmentChart from '@/components/pages/dashboard/WidgetEnrolmentChart.jsx';
import WidgetSignupChart from '@/components/pages/dashboard/WidgetSignupChart.jsx';
import WidgetEnrolments from '@/components/pages/dashboard/WidgetEnrolments.jsx';

export default function DashboardPage() {
  const [permissions] = usePermissions();

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
        {permissions.includes('report:enrolments') && (
          <Grid xs={12} lg={8}>
            <WidgetEnrolmentChart />
          </Grid>
        )}
        {permissions.includes('report:enrolments') && (
          <Grid xs={12} lg={4}>
            <WidgetEnrolments />
          </Grid>
        )}
        {permissions.includes('report:signup') && (
          <Grid xs={12} lg={8}>
            <WidgetSignupChart />
          </Grid>
        )}
      </Grid>
    </>
  );
}
