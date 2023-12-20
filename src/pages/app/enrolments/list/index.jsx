import { appRoute } from '@/helpers/route';
import PageHeader from '@/components/layouts/PageHeader.jsx';
import ListTable from '@/components/pages/enrolments/ListTable.jsx';

export default function EnrolmentList() {
  return (
    <>
      <PageHeader
        title="Campaign Enrolments"
        navs={[
          {
            name: 'Enrolments',
            route: appRoute('/enrolments'),
          },
          {
            name: 'All Enrolments',
          },
        ]}
      />

      <ListTable mb={5} />
    </>
  );
}
