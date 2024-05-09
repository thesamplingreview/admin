import {
  createContext, useState, useMemo, useCallback,
} from 'react';
import { generateNodesStructure } from './helpers';

const initialState = {
  nodes: [],
  popup: false,
  editorWidth: null,
  actions: {},
};

const WFContext = createContext(initialState);

export const WFContextProvider = ({
  dataset,
  children,
}) => {
  const [nodes, setNodes] = useState(dataset || initialState.nodes);
  const [popup, setPopup] = useState(false);
  const [addMeta, setAddMeta] = useState(null);

  const processedNodes = useMemo(() => {
    return generateNodesStructure(nodes);
  }, [nodes]);

  const showNewNode = useCallback(({ nodeId, nodePos }) => {
    setAddMeta({ nodeId, nodePos });
    setPopup(true);
  }, []);

  const addNewNode = useCallback((newNode) => {
    // dono where to add to
    if (!addMeta) {
      return;
    }
    // insert nodes
    setNodes((oldNodes) => {
      const newNodeData = {
        id: (new Date()).valueOf(),
        name: newNode.name,
        type: newNode.key,
        parent_task_id: addMeta.nodeId,
        pos: addMeta.nodePos || null,
        config: {},
      };
      const newNodes = [...oldNodes];
      newNodes.forEach((n) => {
        if (n.parent_task_id === addMeta.nodeId && n.pos === newNodeData.pos) {
          // eslint-disable-next-line no-param-reassign
          n.parent_task_id = newNodeData.id;
        }
      });
      newNodes.push(newNodeData);
      return newNodes;
    });
  }, [addMeta]);

  const removeNode = useCallback((node) => {
    // remove nodes
    setNodes((oldNodes) => {
      let newNodes = [...oldNodes];
      // node's conditional nodes should be removed also (resursively)
      function removeConditionalNodes(nodeId) {
        // remove current node
        newNodes = newNodes.filter((n) => n.id !== nodeId);
        // remove conditional nodes (recursively)
        newNodes
          .filter((n) => n.parent_task_id === nodeId && n.pos)
          .forEach((n) => removeConditionalNodes(n.id));
      }
      removeConditionalNodes(node.id);

      const parentNode = oldNodes.find((n) => n.id === node.parent_task_id);
      newNodes.forEach((n) => {
        if (n.parent_task_id === node.id) {
          // eslint-disable-next-line no-param-reassign
          n.parent_task_id = parentNode?.id || null;
        }
      });
      return newNodes;
    });
  }, []);

  const updateNodeConfig = useCallback((nodeId, newConfig) => {
    // replace nodes
    setNodes((oldNodes) => {
      return oldNodes.map((n) => {
        if (n.id === nodeId) {
          return {
            ...n,
            config: newConfig,
          };
        }
        return n;
      });
    });
  }, []);

  return (
    <WFContext.Provider value={{
      nodes,
      setNodes,
      processedNodes,
      popup,
      setPopup,
      actions: {
        showNewNode,
        addNewNode,
        removeNode,
        updateNodeConfig,
      },
    }}>
      {children}
    </WFContext.Provider>
  );
};

export default WFContext;
