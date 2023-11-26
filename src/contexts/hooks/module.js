import { useContext } from 'react';
import ModuleContext from '../ModuleContext.jsx';

export function useContextState() {
  const {
    loading, error, setLoading, setError,
  } = useContext(ModuleContext);

  return [{ loading, error }, { setLoading, setError }];
}

export function useOptions() {
  const { options } = useContext(ModuleContext);

  return options;
}

export function useModel() {
  const { model, setModel } = useContext(ModuleContext);

  return [model, setModel];
}
