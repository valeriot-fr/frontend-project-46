import fs from 'fs';
import path from 'path';

const getFilePath = (filepath) => path.resolve(process.cwd(), filepath);

const parseFile = (filepath) => {
    const absolutePath = getFilePath(filepath);
    const fileData = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(fileData);
};

const genDiff = (filepath1, filepath2) => {
    const data1 = parseFile(filepath1);
    const data2 = parseFile(filepath2);
    return {
        file1: data1,
        file2: data2,
    };
};

export default genDiff;