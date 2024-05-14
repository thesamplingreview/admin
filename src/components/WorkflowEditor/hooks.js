import { useContext } from 'react';
import WFContext from './WFContext.jsx';

export function useNodes() {
  const { processedNodes, setNodes } = useContext(WFContext);

  return [processedNodes, setNodes];
}

export function usePopup() {
  const { popup, setPopup } = useContext(WFContext);

  return [popup, setPopup];
}

export function useLoading() {
  const { loading } = useContext(WFContext);

  return loading;
}

export function useAction(action) {
  const { actions } = useContext(WFContext);

  return actions[action] || null;
}

export function useOptions() {
  const { options } = useContext(WFContext);

  return options;
}
