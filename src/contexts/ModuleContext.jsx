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
  children,
}) => {
  const [init, setInit] = useState(false);
  const [loading, setLoading] = useState(initialState.loading);
  const [error, setError] = useState(initialState.error);
  const [options, setOptions] = useState(initialState.options);
  const [model, setModel] = useState(initialState.model);

  const fetchInitData = async () => {
    if (!fetchInit) {
      return;
    }
    setLoading(true);
    try {
      const result = await fetchInit();
      setOptions(result);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useOnce(() => {
    fetchInitData().then(() => {
      setInit(true);
    });
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
