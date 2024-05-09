import {
  useRef, useState, useMemo, useCallback, useLayoutEffect, useEffect,
} from 'react';
import Box from '@mui/material/Box';
import { NodeItem } from './WFNodeComps.jsx';
import { useNodes } from './hooks';

export default function WFEditor() {
  const [nodes] = useNodes();

  const $el = useRef(null);
  const [editorWidth, setEditorWidth] = useState(0);

  const rootNode = useMemo(() => {
    const node = nodes.find((n) => !n.parent_task_id);
    return node;
  }, [nodes]);

  const doSetEditorWidth = useCallback(() => {
    // #NOTE: rely on .cond-nodes class
    const $nodeEls = $el.current.querySelectorAll('.cond-nodes');
    const width = Array.from($nodeEls).reduce((acc, $nodeEl) => {
      const nodeWidth = Array.from($nodeEl.children).reduce((a, c) => (a + c.offsetWidth), 0);
      return nodeWidth > acc ? nodeWidth : acc;
    }, 0);
    setEditorWidth(width);
  }, []);

  useEffect(() => {
    doSetEditorWidth();
  }, [nodes.length, doSetEditorWidth]);

  useLayoutEffect(() => {
    doSetEditorWidth();
    window.addEventListener('resize', doSetEditorWidth);
    return () => {
      window.removeEventListener('resize', doSetEditorWidth);
    };
  }, [doSetEditorWidth]);

  return (
    <Box
      ref={$el}
      width="100%"
      overflow="auto"
      p="3rem"
      className="noselect"
    >
      <Box
        // display="flex"
        // flexDirection="column"
        // alignItems="center"
        // justifyContent="center"
        sx={{
          '--wf-gap': '3rem',
          '--wf-width': '400px',
          '--wf-line-color': '#cecece',
          minWidth: `${editorWidth}px`,
        }}
      >
        <NodeItem node={rootNode} />
      </Box>
    </Box>
  );
}
