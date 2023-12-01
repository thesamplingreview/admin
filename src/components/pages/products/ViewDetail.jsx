import { useModel } from '@/contexts/hooks/module';
import CDisplayControl from '@/components/CDisplayControl.jsx';
import BadgeStatus from './BadgeStatus.jsx';

export default function ViewDetail() {
  const [model] = useModel();

  return (
    <>
      <CDisplayControl
        label="Product Name"
        value={model.name}
      />
      <CDisplayControl
        label="Product Image"
        type="image"
        size={6}
        value={model.image_url}
      />
      <CDisplayControl
        label="Brand"
        value={model.brand}
      />
      <CDisplayControl
        label="Description"
        type="html"
        value={model.description.replace(/\n/g, '<br>')}
      />
      <CDisplayControl label="Status">
        <BadgeStatus status={model.status} />
      </CDisplayControl>
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
    </>
  );
}
