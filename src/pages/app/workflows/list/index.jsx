import { appRoute } from '@/helpers/route';
import CBox from '@/components/CBox.jsx';
import PageHeader from '@/components/layouts/PageHeader.jsx';
// import ListTable from '@/components/pages/vendors/ListTable.jsx';
import { WorkflowEditor } from '@/components/WorkflowEditor';

export default function WorkflowList() {
  return (
    <>
      <PageHeader
        title="Workflows"
        navs={[
          {
            name: 'Workflows',
            route: appRoute('/workflows'),
          },
          {
            name: 'All Workflows',
          },
        ]}
      />

      <CBox noPadding mb={5}>
         <WorkflowEditor />
      </CBox>
    </>
  );
}
