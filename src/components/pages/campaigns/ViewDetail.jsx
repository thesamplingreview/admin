import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useModel } from '@/contexts/hooks/module';
import CBox from '@/components/CBox.jsx';
import CDisplayControl from '@/components/CDisplayControl.jsx';

export default function ViewDetail({ ...props }) {
  const [model] = useModel();

  return (
    <CBox title="Entry Detail" toggleable {...props}>
      <CDisplayControl
        label="Campaign Name"
        value={model.name}
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
        value={model.description}
      />
      <CDisplayControl
        label="Cover Image"
        type="image"
        size={6}
        value={model.cover_url}
      />

      <Box my={3}>
        <Divider />
      </Box>

      <CDisplayControl
        label="Intro Title"
        value={model.intro_title}
      />
      <CDisplayControl
        label="Intro Description"
        type="html"
        value={model.intro_description?.replace(/\n/g, '<br>')}
      />
      <CDisplayControl
        label="Pre-Submit Title"
        value={model.presubmit_title}
      />
      <CDisplayControl
        label="Pre-Submit Description"
        type="html"
        value={model.presubmit_description?.replace(/\n/g, '<br>')}
      />
      <CDisplayControl
        label="Post-Submit Title"
        value={model.postsubmit_title}
      />
      <CDisplayControl
        label="Post-Submit Description"
        type="html"
        value={model.postsubmit_description?.replace(/\n/g, '<br>')}
      />
      <CDisplayControl
        label="Background"
        type="image"
        size={6}
        value={model.background_url}
      />

      <Box my={3}>
        <Divider />
      </Box>

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

      {model.review_type === 'redirect' && (
        <>
          <Box my={3}>
            <Divider />
          </Box>

          <CDisplayControl
            label="Review Instruction"
            type="html"
            value={model.review_instruction}
          />
          <CDisplayControl
            label="Review CTA"
            type="url"
            value={model.review_cta}
            valueProps={{
              target: '_blank',
            }}
          />
        </>
      )}
    </CBox>
  );
}
