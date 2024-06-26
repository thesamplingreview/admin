import nodesList from './nodes';

// eslint-disable-next-line import/prefer-default-export
export function generateNodesStructure(nodes) {
  const ds = nodes.map((node) => {
    const condIds = {};
    let childId = null;
    nodes.forEach((n) => {
      if (n.parent_task_id === node.id) {
        if (n.pos) {
          condIds[n.pos] = n.id;
        } else {
          childId = n.id;
        }
      }
    });

    return {
      ...node,
      node_detail: nodesList[node.action] || null,
      child_id: childId,
      cond_ids: condIds,
    };
  });
  return ds;
}
