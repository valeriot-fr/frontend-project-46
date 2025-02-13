import _ from "lodash";

const formatValue = (value) => {
    if (_.isObject(value)) return '[complex value]';
    if (value === null) return 'null';
    if (typeof value === 'string') return `${value}`;
    return String(value);
};

const plain = (diff, path = '') => {
    return diff
        .filter(({ type }) => type !== 'unchanged')
        .map(({ key, type, value, oldValue, newValue, children }) => {
            const fullPath = path ? `${path}.${key}` : key;
            switch (type) {
                case 'added':
                    return `Property '${fullPath}' was added with value: ${formatValue(value)}`;
                case 'removed':
                    return `Property '${fullPath}' was removed`;
                case 'updated':
                    return `Property '${fullPath}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`;
                case 'nested':
                    return plain(children, fullPath);
                default:
                    return null;
            }
        })
        .filter(Boolean)
        .join('\n')
};

export default plain;