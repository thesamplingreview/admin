import { createContext, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

const initialState = {
  module: '',
  sidenav: '',
};

const LayoutContext = createContext(initialState);

export const LayoutProvider = ({
  children,
}) => {
  const location = useLocation();

  const [sidenav, setSidenav] = useState(initialState.sidenav);

  const currModule = useMemo(() => {
    const pathSegs = location.pathname.split('/');
    return pathSegs?.[2] || '';
  }, [location.pathname]);

  return (
    <LayoutContext.Provider value={{
      currModule,
      sidenav,
      setSidenav,
    }}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContext;
