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

export function useEditorWidth() {
  const { editorWidth } = useContext(WFContext);

  return editorWidth;
}

export function useAction(action) {
  const { actions } = useContext(WFContext);

  return actions[action] || null;
}
