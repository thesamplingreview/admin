import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import FasIcon from '@/components/FasIcon.jsx';

export default function CConfirmAlert({
  open,
  title,
  message,
  txtCancel = 'Cancel',
  txtConfirm = 'Confirm',
  children,
  onConfirm,
  onCancel,
  ...props
}) {
  return (
    <Dialog
      open={open}
      maxWidth="xs"
      onClose={onCancel}
      {...props}
    >
      <DialogTitle>
        <FasIcon name="fa-triangle-exclamation" color="#ffb822" mr={2} />
        {title}
      </DialogTitle>
      <DialogContent dividers>
        {message && (
          <Box py={2}>
            {message}
          </Box>
        )}
        {!message && children}
      </DialogContent>
      <DialogActions>
        <Button autoFocus color="text" onClick={onCancel}>
          {txtCancel}
        </Button>
        <Button color="error" onClick={onConfirm}>
          {txtConfirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
