import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FasIcon from '@/components/FasIcon.jsx';
import WFNodeBlock from './WFNodeBlock.jsx';
import { useNodes, useAction } from './hooks';

export const NodeItem = ({ node }) => {
  const [nodes] = useNodes();

  const isConditional = useMemo(() => {
    return node.node_detail?.conditionable?.length;
  }, [node]);

  const childNodes = useMemo(() => {
    let child = null;
    if (node.child_id) {
      child = nodes.find((n) => n.id === node.child_id);
    }

    let left = null;
    let right = null;
    if (isConditional && node.cond_ids) {
      left = nodes.find((n) => n.id === node.cond_ids.left) || null;
      right = nodes.find((n) => n.id === node.cond_ids.right) || null;
    }
    return { child, left, right };
  }, [node, nodes, isConditional]);

  return (
    <>
      {/* main node */}
      <Box>
        <WFNodeBlock node={node} />
      </Box>

      {/* non-conditional line */}
      {!isConditional && (
        <NodeDirectLine node={node} />
      )}

      {/* conditional line */}
      {isConditional && (
        <NodeCondsLine
          node={node}
          leftNode={childNodes.left}
          rightNode={childNodes.right}
        />
      )}

      {/* child node */}
      {childNodes.child && (
        <NodeItem node={childNodes.child} />
      )}
    </>
  );
};

export const NodeHorLine = ({ pos }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: 'calc(50% + 4px)',
        height: '4px',
        marginLeft: '-2px',
        marginRight: '-2px',
        bgcolor: 'var(--wf-line-color)',
        transition: 'background .3s',
        ...pos,
      }}
    />
  );
};

export const NodeVertLine = ({ addable }) => {
  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '4px',
          left: 'calc(50% - 2px)',
          bgcolor: 'var(--wf-line-color)',
          transition: 'background .3s',
        }}
      />
      {addable && (
        <Box
          sx={{
            position: 'absolute',
            zIndex: 1,
            top: '50%',
            left: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            width: '1.5em',
            height: '1.5em',
            borderRadius: '50%',
            bgcolor: 'var(--wf-line-color)',
            transform: 'translate(-50%, -50%)',
            transition: 'background .3s',
          }}
        >
          <FasIcon name="fa-plus" fontSize="0.75em" color="#fff" />
        </Box>
      )}
    </>
  );
};

export const NodeDirectLine = ({ node }) => {
  const showNewNode = useAction('showNewNode');

  const handleAdd = () => {
    showNewNode({
      nodeId: node.id,
      nodePos: null,
    });
  };

  return (
    <Box
      position="relative"
      flexGrow="1"
      width="var(--wf-width)"
      mx="auto"
      className="clickable"
      sx={{
        minHeight: 'calc(var(--wf-gap) * 2)',
        '&:hover': {
          '--wf-line-color': '#a4a4a4',
        },
      }}
      onClick={handleAdd}
    >
      <NodeVertLine addable />
    </Box>
  );
};

export const NodeCondsLine = ({ node, leftNode, rightNode }) => {
  const showNewNode = useAction('showNewNode');

  const handleAdd = (pos) => {
    showNewNode({
      nodeId: node.id,
      nodePos: pos || null,
    });
  };

  return (
    <Box display="flex" flexDirection="column" flexGrow="1">
      {/* top join line */}
      <Box
        position="relative"
        sx={{ minHeight: 'calc(var(--wf-gap) * 1)' }}
      >
        <NodeVertLine />
      </Box>

      <Box display="flex" className="cond-nodes">
        {/* left */}
        <NodeCondCol
          type="left"
          label={node.node_detail?.conditionable?.[0] || 'True'}
          node={leftNode}
          onAdd={handleAdd}
        />
        {/* right */}
        <NodeCondCol
          type="right"
          label={node.node_detail?.conditionable?.[1] || 'False'}
          node={rightNode}
          onAdd={handleAdd}
        />
      </Box>

      {/* btm join line */}
      <Box
        position="relative"
        className="clickable"
        flexGrow="1"
        sx={{
          minHeight: 'calc(var(--wf-gap) * 2)',
          '&:hover': {
            '--wf-line-color': '#a4a4a4',
          },
        }}
        onClick={() => handleAdd()}
      >
        <NodeVertLine addable />
      </Box>
    </Box>
  );
};

export const NodeCondCol = ({
  node,
  type,
  label,
  onAdd,
}) => {
  const handleAdd = () => {
    onAdd(type);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      ml={type === 'left' ? 'auto' : 0}
      mr={type === 'right' ? 'auto' : 0}
    >
      <Box
        position="relative"
        width="100%"
        height="calc(var(--wf-gap) * 0.5)"
      >
        <NodeHorLine
          pos={{ left: type === 'left' ? '50%' : '0' }}
        />
        <NodeVertLine />
        <Typography
          component="div"
          sx={{
            position: 'absolute',
            top: 0,
            left: '50%',
            fontSize: '0.75rem',
            fontWeight: 500,
            color: '#999',
            transform: 'translate(-50%, -115%)',
          }}
        >
          {label}
        </Typography>
      </Box>

      {/* if have node, rely on node add */}
      {node && (
        <Box
          display="flex"
          flexDirection="column"
          flexGrow="1"
          px={2}
        >
          <NodeItem node={node} />
        </Box>
      )}
      {/* if don't have node, enable add for pos */}
      {!node && (
        <Box
          position="relative"
          flexGrow="1"
          width="var(--wf-width)"
          mx="auto"
          className="clickable"
          sx={{
            minHeight: 'calc(var(--wf-gap) * 2)',
            '&:hover': {
              '--wf-line-color': '#a4a4a4',
            },
          }}
          onClick={handleAdd}
        >
          <NodeVertLine addable />
        </Box>
      )}

      <Box
        position="relative"
        width="100%"
        height="4px"
        // height="calc(var(--wf-gap) * 0.5)"
      >
        <NodeHorLine
          pos={{ left: type === 'left' ? '50%' : '0' }}
        />
      </Box>
    </Box>
  );
};
