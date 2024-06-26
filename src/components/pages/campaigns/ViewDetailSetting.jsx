import { Link } from 'react-router-dom';
import { useModel } from '@/contexts/hooks/module';
import { appRoute } from '@/helpers/route';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CBox from '@/components/CBox.jsx';
import CDisplayControl from '@/components/CDisplayControl.jsx';
import FasIcon from '@/components/FasIcon.jsx';
import BadgeStatus from './BadgeStatus.jsx';

export default function ViewDetail({ ...props }) {
  const [model] = useModel();

  return (
    <CBox title="Campaign Settings" toggleable {...props}>
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
        label="Enrolments Quota"
        value={model.quota}
      />
      <CDisplayControl label="Review Type">
        <Box display="inline-flex" alignItems="center" spacing={1}>
          {model.review_type && (
            <>
              <Typography variant="body1" fontWeight="500">
                {model.review_type}
              </Typography>
            </>
          )}
          {!model.review_type && (
            <>
              <Tooltip title="Incomplete review_type setup" placement="right" arrow>
                <Box>
                  <FasIcon name="fa-triangle-exclamation" color="#ffb822" />
                </Box>
              </Tooltip>
              <Button
                component={Link}
                to={appRoute(`/campaigns/${model.id}/setting`)}
                size="small"
                sx={{ my: -1, px: 1, minWidth: '3em' }}
              >
                Go to setting
              </Button>
            </>
          )}
        </Box>
      </CDisplayControl>
      <CDisplayControl label="Enrolment Form">
        <Box display="inline-flex" alignItems="center" spacing={1}>
          {model.form_id && (
            <>
              <Typography variant="body1" fontWeight="500">
                {model.form?.name || '-'}
              </Typography>
              <Button
                component={Link}
                title="Edit form"
                to={appRoute(`/forms/${model.form_id}/fields`)}
                size="small"
                sx={{ my: -1, px: 1, minWidth: '3em' }}
              >
                Edit form
              </Button>
            </>
          )}
          {!model.form_id && (
            <>
              <Tooltip title="Incomplete enrolment form setup" placement="right" arrow>
                <Box>
                  <FasIcon name="fa-triangle-exclamation" color="#ffb822" />
                </Box>
              </Tooltip>
              <Button
                component={Link}
                to={appRoute(`/campaigns/${model.id}/setting`)}
                size="small"
                sx={{ my: -1, px: 1, minWidth: '3em' }}
              >
                Go to setting
              </Button>
            </>
          )}
        </Box>
      </CDisplayControl>
      <CDisplayControl
        label="Vendor"
        value={model.vendor?.name}
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
    </CBox>
  );
}
