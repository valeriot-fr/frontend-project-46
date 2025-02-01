import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getFilePath = (filepath) => path.resolve(process.cwd(), filepath);

const parseFile = (filepath) => {
    const absolutePath = getFilePath(filepath);
    const fileData = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(fileData);
};

const genDiff = (filepath1, filepath2) => {
    const data1 = parseFile(filepath1);
    const data2 = parseFile(filepath2);

    const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

    const diff = keys.map((key) => {
        if (!Object.hasOwn(data2, key)) return ` - ${key}: ${data1[key]}`;
        if (!Object.hasOwn(data1, key)) return ` - ${key}: ${data2[key]}`;
        if (data1[key] !== data2[key]) {
            return ` - ${key}: ${data1[key]}\n + ${key}: ${data2[key]}`;
        }
        return `  ${key}: ${data1[key]}`;
    });
    return `{\n${diff.join('\n')}\n}`;
};

export default genDiff;