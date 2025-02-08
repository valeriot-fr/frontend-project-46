import _ from "lodash";

const getIndent = (depth) => ' '.repeat(depth * 4 - 2);
const formatValue = (value, depth) => {
    if (!_.isObject(value)) return value;
    const indent = getIndent(depth + 1);
    const entries = Object.entries(value)
        .map(([key, val]) => `${indent}  ${key}: ${formatValue(val, depth + 1)}`);
    return `{\n${entries.join('\n')}\n${getIndent(depth)}  }`;
};

const stylish = (diff, depth = 1) => {
    const lines = diff.map((node) => {
        const indent = getIndent(depth);
        switch (node.type) {
            case 'removed':
                return `${indent}- ${node.key}: ${formatValue(node.value, depth)}`;
            case 'added':
                return `${indent}+ ${node.key}: ${formatValue(node.value, depth)}`;
            case 'updated':
                return `${indent}- ${node.key}: ${formatValue(node.oldValue, depth)}\n${indent}+ ${node.key}: ${formatValue(node.newValue, depth)}`;
            case 'nested':
                return `${indent}  ${node.key}: {\n${stylish(node.children, depth + 1)}\n${indent}  }`;
            default:
                return `${indent}  ${node.key}: ${formatValue(node.value, depth)}`;
        }
    });
    return lines.join('\n');
};

export default stylish;