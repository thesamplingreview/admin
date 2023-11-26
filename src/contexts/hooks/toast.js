import { useContext, useCallback } from 'react';
import ToastContext from '../ToastContext.jsx';

// eslint-disable-next-line import/prefer-default-export
export function useToast() {
  const { setAlert } = useContext(ToastContext);

  const doPush = useCallback((type, message) => {
    if (message) {
      setAlert({
        key: (new Date()).valueOf(),
        type,
        message,
      });
    }
  }, [setAlert]);

  return doPush;
}
