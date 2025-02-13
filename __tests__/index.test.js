import { fileURLToPath } from 'url';
import path, { join } from 'path';
import genDiff from '../src/index.js';
import { readFileSync } from 'fs';
import { formatDiff } from '../src/formatters/formatters.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const normalizeWhiteSpace = (str) => str.replace(/\s+/g, ' ').trim();

describe.each([
    ['JSON files', 'file1.json', 'file2.json'],
    ['YML files', 'file1.yml', 'file2.yml'],
])('gendiff with %s', (_, file1Name, file2Name) => {
    const file1 = getFixturePath(file1Name);
    const file2 = getFixturePath(file2Name);

    test.each([
      ['stylish', undefined, 'expected_stylish.json'],
      ['plain', 'plain', 'expected_plain.txt'],
      ['json', 'json', 'expected_json.json'],
    ])('should generate %s format', (_, format, expectedFile) => {
        const expectedOutput = readFile(expectedFile);
        expect(normalizeWhiteSpace(genDiff(file1, file2, format)))
            .toMatch(normalizeWhiteSpace(expectedOutput));
    });
});

describe('formatDiff', () => {
    test('should throw an error for an unknown format', () => {
        expect(() => formatDiff([], 'unknownFormat')).toThrow('Unknown format: unknownFormat');
    });
});