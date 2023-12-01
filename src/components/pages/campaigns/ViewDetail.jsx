import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useModel } from '@/contexts/hooks/module';
import { publicRoute } from '@/helpers/route';
import CBox from '@/components/CBox.jsx';
import FasIcon from '@/components/FasIcon.jsx';
import CDisplayControl from '@/components/CDisplayControl.jsx';
import BadgeStatus from './BadgeStatus.jsx';

export default function ViewDetail({ ...props }) {
  const [model] = useModel();

  return (
    <CBox title="Entry Detail" {...props}>
      <CDisplayControl
        label="Campaign Name"
        value={model.name}
      />
      <CDisplayControl
        label="Public Page"
        type="url"
        value={publicRoute(`/campaigns/${model.slug}`)}
        valueProps={{
          target: '_blank',
          endIcon: <FasIcon name="fa-arrow-up-right-from-square" fontSize=".75em !important" />,
        }}
      />
      <CDisplayControl
        label="Start Date"
        type="date"
        value={model.start_date}
      />
      <CDisplayControl
        label="End Date"
        type="date"
        value={model.end_date}
      />
      <CDisplayControl
        label="Description"
        type="html"
        value={model.description?.replace(/\n/g, '<br>')}
      />
      <CDisplayControl
        label="Cover Image"
        type="image"
        size={6}
        value={model.cover_url}
      />
      <CDisplayControl
        label="SEO Meta Title"
        value={model.meta_title}
      />
      <CDisplayControl
        label="SEO Meta Description"
        value={model.meta_description}
      />
      <CDisplayControl
        label="SEO Meta Tags"
        value={model.meta_tag}
      />
      <Box my={3}>
        <Divider />
      </Box>
      <CDisplayControl
        label="Vendor"
        value={model.vendor?.name}
      />
      <CDisplayControl
        label="Enrolment Form"
        value={model.form?.name}
      />
      <CDisplayControl label="Status">
        <BadgeStatus status={model.status} />
      </CDisplayControl>
      <CDisplayControl
        label="Highligted"
        value={model.highlight ? 'Yes' : 'No'}
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
