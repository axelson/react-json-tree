import React from 'react';
import objType from './obj-type';
import JSONObjectNode from './JSONObjectNode';
import JSONArrayNode from './JSONArrayNode';
import JSONIterableNode from './JSONIterableNode';
import JSONValueNode from './JSONValueNode';

export default function({
  getItemString,
  initialExpanded = false,
  keyPath,
  labelRenderer,
  previousData,
  styles,
  theme,
  value,
  valueRenderer,
  isCustomNode,
  ...rest
}) {
  const nodeType = isCustomNode(value) ? 'Custom' : objType(value);

  const simpleNodeProps = {
    getItemString,
    initialExpanded,
    key: keyPath[0],
    keyPath,
    labelRenderer,
    nodeType,
    previousData,
    styles,
    theme,
    value,
    valueRenderer
  };

  const nestedNodeProps = {
    ...rest,
    ...simpleNodeProps,
    data: value,
    isCustomNode
  };

  switch (nodeType) {
    case 'Object':
      return <JSONObjectNode {...nestedNodeProps} />;
    case 'Array':
      return <JSONArrayNode {...nestedNodeProps} />;
    case 'Iterable':
      return <JSONIterableNode {...nestedNodeProps} />;
    case 'String':
      return <JSONValueNode {...simpleNodeProps} valueColor={theme.base0B} valueGetter={raw => `"${raw}"`} />;
    case 'Number':
      return <JSONValueNode {...simpleNodeProps} valueColor={theme.base09} />;
    case 'Boolean':
      return <JSONValueNode {...simpleNodeProps} valueColor={theme.base09} valueGetter={raw => raw ? 'true' : 'false'} />;
    case 'Date':
      return <JSONValueNode {...simpleNodeProps} valueColor={theme.base0B} valueGetter={raw => raw.toISOString()} />;
    case 'Null':
      return <JSONValueNode {...simpleNodeProps} valueColor={theme.base08} valueGetter={() => 'null'} />;
    case 'Undefined':
      return <JSONValueNode {...simpleNodeProps} valueColor={theme.base08} valueGetter={() => 'undefined'} />;
    case 'Function':
      return <JSONValueNode {...simpleNodeProps} valueColor={theme.base08} valueGetter={raw => raw.toString()} />;
    case 'Custom':
      return <JSONValueNode {...simpleNodeProps} />;
    default:
      return false;
  }
}
