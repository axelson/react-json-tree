import React from 'react';
import JSONNestedNode from './JSONNestedNode';

// Returns the "n Items" string for this node, generating and caching it if it hasn't been created yet.
function createItemString(data) {
  return `${data.length} ${data.length !== 1 ? 'items' : 'item'}`;
}

// Configures <JSONNestedNode> to render an Array
export default function JSONArrayNode({ ...props }) {
  return (
    <JSONNestedNode
      {...props}
      nodeType='Array'
      nodeTypeIndicator='[]'
      createItemString={createItemString}
    />
  );
}
