import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import gendiff from '../src/index.js';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const normalizeWhiteSpace = (str) => str.replace(/\s+/g, ' ').trim();

test('gendiff flat YAML files', () => {
    const file1 = getFixturePath('file1.yml');
    const file2 = getFixturePath('file2.yml');
    const expectedOutput = `{
        - follow: false
          host: hexlet.io
        - proxy: 123.234.53.22
        - timeout: 50
        + timeout: 20
        + verbose: true
    }`;
    expect(normalizeWhiteSpace(gendiff(file1, file2))).toMatch(normalizeWhiteSpace(expectedOutput.trim()));
});