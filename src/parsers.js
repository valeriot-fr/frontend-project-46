import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

export const parseFile = (filepath) => {
    const ext = path.extname(filepath);
    const data = fs.readFileSync(filepath, 'utf-8');

    switch (ext) {
        case '.yaml':
        case '.yml':
            return yaml.load(data);
        case '.json':
            return JSON.parse(data);
        default:
            throw new Error(`Unsupported file type: ${ext}`);
    }
};