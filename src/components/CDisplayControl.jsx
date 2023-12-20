import { isDate, format } from 'date-fns';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import config from '@/config/app';
import FasIcon from '@/components/FasIcon.jsx';

export default function CDisplayControl({
  label,
  type = 'text',
  value = '',
  size = 9,
  children,
  valueProps = null,
}) {
  return (
    <Grid container spacing={3} alignItems="flex-start" my={0}>
      <Grid xs={12} md={4} lg={3}>
        <Typography variant="label" fontWeight="400">
          {label}
        </Typography>
      </Grid>
      <Grid md={8} lg={size}>
        {Boolean(children) && children}
        {!children && <ValueComp type={type} value={value} valueProps={valueProps} />}
      </Grid>
    </Grid>
  );
}

const ValueComp = ({
  type,
  value,
  valueProps,
}) => {
  // image
  if (value && type === 'image') {
    return (
      <Box
        {...valueProps}
        component="img"
        src={value}
        alt=""
        loading="lazy"
        width="400"
        height="400"
        sx={{
          width: '100%',
          height: 'auto',
          borderRadius: '4px',
          ...valueProps?.sx,
        }}
      />
    );
  }
  // html
  if (value && type === 'html') {
    return (
      <Typography
        {...valueProps}
        variant="body1"
        fontWeight="500"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    );
  }
  // url
  if (value && type === 'url') {
    return (
      <Box display="inline-flex" spacing={1}>
        <Typography variant="body1" fontWeight="500">
          {value}
        </Typography>
        <Button
          {...valueProps}
          component={Link}
          to={valueProps?.link || value}
          size="small"
          sx={{ my: -1, px: 1, minWidth: '3em' }}
        >
          <FasIcon name="fa-link" fontSize="0.875em" />
        </Button>
      </Box>
    );
  }

  // text
  let renderValue = value;
  // formatter - date & time
  if (renderValue && (
    type === 'datetime'
    || type === 'date'
    || type === 'time'
  )) {
    const dt = new Date(value);
    if (isDate(dt)) {
      if (type === 'datetime') {
        renderValue = format(dt, config.formatDateTime);
      } else if (type === 'date') {
        renderValue = format(dt, config.formatDate);
      } else if (type === 'time') {
        renderValue = format(dt, config.formatTime);
      }
    }
  }
  return (
    <Typography {...valueProps} variant="body1" fontWeight="500">
      {renderValue || renderValue === 0 ? renderValue : '-'}
    </Typography>
  );
};
