/*import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getFileData = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(absolutePath, 'utf-8');
};

export const parse = (filepath) => {
  const ext = path.extname(filepath);
  const data = getFileData(filepath);
  return ext === 'json' ? JSON.parse(data) : yaml.load(data);
};*/

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export const parse = (filepath) => {
  const ext = path.extname(filepath).slice(1); // Убираем точку
  const data = fs.readFileSync(filepath, 'utf-8'); // Читаем файл

  if (ext === 'json') {
    return JSON.parse(data);
  }
  if (ext === 'yml' || ext === 'yaml') {
    return yaml.load(data);
  }

  throw new Error(`Unsupported file format: ${ext}`);
};
