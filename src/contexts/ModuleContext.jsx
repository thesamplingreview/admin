import { createContext, useState } from 'react';
import { useOnce } from '@/helpers/hooks';
import CLoader from '@/components/CLoader.jsx';
import CError from '@/components/CError.jsx';

const initialState = {
  loading: false,
  error: null,
  options: {},
  modelId: '',
  model: null,
};

const ModuleContext = createContext(initialState);

export const ModuleProvider = ({
  fetchInit,
  initModel,
  children,
}) => {
  const [init, setInit] = useState(false);
  const [loading, setLoading] = useState(initialState.loading);
  const [error, setError] = useState(initialState.error);
  const [options, setOptions] = useState(initialState.options);
  const [model, setModel] = useState(initModel || initialState.model);

  const fetchInitData = async () => {
    if (!fetchInit) {
      setInit(true);
      return;
    }
    setLoading(true);
    try {
      const result = await fetchInit();
      setOptions(result);
      setLoading(false);
      setInit(true);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  useOnce(() => {
    fetchInitData();
  });

  return (
    <ModuleContext.Provider value={{
      loading,
      error,
      options,
      model,
      setModel,
    }}>
      {/* loading state */}
      {loading && <CLoader full="header" fullOffset="24px" />}

      {/* error state */}
      {!loading && error && <CError full="header" fullOffset="24px" fasIcon="fa-circle-exclamation" />}

      {/* content */}
      {!loading && !error && init && children}
    </ModuleContext.Provider>
  );
};

export default ModuleContext;
