import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export const parse = (filepath) => {
  const ext = path.extname(filepath).slice(1);
  const data = fs.readFileSync(filepath, 'utf-8');

  if (ext === 'json') {
    return JSON.parse(data);
  }
  if (ext === 'yml' || ext === 'yaml') {
    return yaml.load(data);
  }

  throw new Error(`Unsupported file format: ${ext}`);
};
