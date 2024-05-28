import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FasIcon from '@/components/FasIcon.jsx';
import CLoadingButton from '@/components/CLoadingButton.jsx';
import { useAction, useLoading } from './hooks';

export default function WFHeader({
  title,
  isFull,
  setIsFull,
  onBack,
  onEditName,
}) {
  const handleSave = useAction('handleSave');
  const loading = useLoading();

  const toggleIsFull = () => {
    setIsFull((oldState) => !oldState);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      bgcolor="#fff"
      borderBottom="1px solid var(--border-500)"
      py={2}
      px={3}
      sx={{
        position: 'sticky',
        zIndex: 5,
        top: 0,
      }}
    >
      <IconButton sx={{ mr: 2 }} onClick={onBack}>
        <FasIcon name="fa-chevron-left" color="var(--color-300)" fontSize="1rem" />
      </IconButton>
      <Typography variant="h6">{title}</Typography>
      {onEditName && (
        <IconButton sx={{ ml: 2 }} onClick={onEditName}>
          <FasIcon name="fa-pencil-alt" color="var(--color-300)" fontSize="1rem" />
        </IconButton>
      )}
      <Box display="flex" alignItems="center" gap={3} sx={{ ml: 'auto' }}>
        <IconButton onClick={toggleIsFull}>
          <FasIcon
            name={isFull ? 'fa-compress' : 'fa-expand'}
            color="var(--color-300)"
          />
        </IconButton>
        <CLoadingButton
          variant="contained"
          loading={loading}
          onClick={handleSave}
        >
          Save
        </CLoadingButton>
      </Box>
    </Box>
  );
}
