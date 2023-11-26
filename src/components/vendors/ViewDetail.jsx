import { useModel } from '@/contexts/hooks/module';
import CDisplayControl from '@/components/CDisplayControl.jsx';

export default function ViewDetail() {
  const [model] = useModel();

  return (
    <>
      <CDisplayControl
        label="Vendor Name"
        value={model.name}
      />
      <CDisplayControl
        label="Vendor Logo"
        type="image"
        size={6}
        value={model.logo_url}
        valueProps={{
          sx: { width: 100, height: 100 },
        }}
      />
      <CDisplayControl
        label="Profile"
        type="html"
        value={model.profile?.replace(/\n/g, '<br>')}
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
    </>
  );
}
