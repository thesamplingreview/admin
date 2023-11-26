import { createContext, useState } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useUpdated } from '@/helpers/hooks';

const initialState = {
  alert: null,
};

const ToastContext = createContext(initialState);

export const ToastProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(initialState.alert);

  const handleClose = () => {
    setShow(false);
  };

  useUpdated(() => {
    setShow(true);
  }, [alert?.key]);

  return (
    <ToastContext.Provider value={{
      alert,
      setAlert,
    }}>
      {children}

      <Snackbar
        open={show}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert severity={alert?.type} sx={{ width: '100%' }} onClose={handleClose} >
          {alert?.message || ''}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export default ToastContext;
