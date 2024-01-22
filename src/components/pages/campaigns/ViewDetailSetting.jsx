import { useModel } from '@/contexts/hooks/module';
import { publicRoute, appRoute } from '@/helpers/route';
import CBox from '@/components/CBox.jsx';
import CDisplayControl from '@/components/CDisplayControl.jsx';
import BadgeStatus from './BadgeStatus.jsx';

export default function ViewDetail({ ...props }) {
  const [model] = useModel();
  console.log(model)

  return (
    <CBox title="Campaign Settings" toggleable {...props}>
      <CDisplayControl
        label="Campaign URL"
        type="url"
        value={`/programs/${model.slug}`}
        valueProps={{
          target: '_blank',
          link: publicRoute(`/programs/${model.slug}`),
        }}
      />
      <CDisplayControl
        label="Campaign Name"
        value={model.name}
      />
      <CDisplayControl label="Status">
        <BadgeStatus status={model.status} />
      </CDisplayControl>
      <CDisplayControl
        label="Vendor"
        value={model.vendor?.name}
      />
      <CDisplayControl
        label="Enrolment Form"
        type="url"
        value={model.form?.name}
        valueProps={{
          link: model.form_id ? appRoute(`/forms/${model.form_id}/fields`) : '#',
          title: 'Edit form',
          icon: 'fa-pencil',
        }}
      />
      <CDisplayControl
        label="Review Type"
        value={model.review_type}
      />
      <CDisplayControl
        label="Last Update"
        type="datetime"
        value={model.updated_at}
      />
      <CDisplayControl
        label="Created Date"
        type="datetime"
        value={model.created_at}
      />
    </CBox>
  );
}
