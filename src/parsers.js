import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getFileData = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(absolutePath, 'utf-8');
};

export const parse = (filepath) => {
  const ext = path.extname(filepath);
  const data = getFileData(filepath);
  return ext === '.json' ? JSON.parse(data) : yaml.load(data);
};
