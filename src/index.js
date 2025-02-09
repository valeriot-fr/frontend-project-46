import { parse } from './parsers.js';
import buildDiff from './buildDiff.js';
import formatters from './formatters/formatters.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
    const data1 = parse(filepath1);
    const data2 = parse(filepath2);
    const diff = buildDiff(data1, data2);

    return formatters[format](diff);
};

export default genDiff;