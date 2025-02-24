import _ from 'lodash';

const replacer = '    ';

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const currentReplacer = replacer.repeat(depth);
  const entries = Object.entries(data);
  const strings = entries.map(([key, value]) => `${currentReplacer}    ${key}: ${stringify(value, depth + 1)}`);
  return `{\n${strings.join('\n')}\n${currentReplacer}}`;
};

const stylish = (data) => {
  const iter = (obj, depth) => {
    const currentReplacer = replacer.repeat(depth);
    const result = obj.flatMap((node) => {
      const {
        key, oldValue, newValue, value, type, children,
      } = node;
      switch (type) {
        case 'added':
          return `${currentReplacer}  + ${key}: ${stringify(value, depth + 1)}`;
        case 'deleted':
          return `${currentReplacer}  - ${key}: ${stringify(value, depth + 1)}`;
        case 'unchanged':
          return `${currentReplacer}    ${key}: ${stringify(value, depth + 1)}`;
        case 'changed':
          return `${currentReplacer}  - ${key}: ${stringify(oldValue, depth + 1)}\n${currentReplacer}  + ${key}: ${stringify(newValue, depth + 1)}`;
        case 'hasChild':
          return `${currentReplacer}    ${key}: ${iter(children, depth + 1)}`;
        default:
          throw new Error(`Unexpected type encountered: ${type}. Node details: ${JSON.stringify(node)}`);
      }
    });
    return `{\n${result.join('\n')}\n${currentReplacer}}`;
  };
  return iter(data, 0);
};

export default stylish;
