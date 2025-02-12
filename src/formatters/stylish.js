const INDENT_SIZE = 4;
const OFFSET = 2;

const indent = (depth) => ' '.repeat(depth * INDENT_SIZE - OFFSET);

const stringify = (value, depth = 1) => {
  if (typeof value !== 'object' || value === null) return String(value);
  const entries = Object.entries(value)
    .map(([key, val]) => `${indent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`)
    .join('\n');
  return `{\n${entries}\n${indent(depth)}  }`;
};

const stylish = (diff, depth = 1) => {
  const formatNode = (node) => {
    switch (node.type) {
      case 'added':
        return `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
      case 'removed':
        return `${indent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
      case 'changed':
        return [
          `${indent(depth)}- ${node.key}: ${stringify(node.oldValue, depth)}`,
          `${indent(depth)}+ ${node.key}: ${stringify(node.newValue, depth)}`,
        ].join('\n');
      case 'nested':
        return `${indent(depth)}  ${node.key}: {\n${stylish(node.children, depth + 1)}\n${indent(depth)}  }`;
      default:
        return `${indent(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
    }
  };

  return diff.map(formatNode).join('\n');
};

export default stylish;