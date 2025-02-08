import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import gendiff from '../src/index.js';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(filename, 'utf-8');

const normalizeWhiteSpace = (str) => str.replace(/\s+/g, ' ').trim();

test('gendiff nested YAML files', () => {
    const file1 = getFixturePath('file1.yml');
    const file2 = getFixturePath('file2.yml');
    const expectedOutput = readFile(getFixturePath('expected_stylish.json'));
    expect(normalizeWhiteSpace(gendiff(file1, file2))).toMatch(normalizeWhiteSpace(expectedOutput));
});
test('gendiff nested JSON files', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const expectedOutput = readFile(getFixturePath('expected_stylish.json'));
    expect(normalizeWhiteSpace(gendiff(file1, file2))).toMatch(normalizeWhiteSpace(expectedOutput));
});
test('gendiff plain format JSON files', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const expectedOutput = readFile(getFixturePath('expected_plain.txt'));
    expect(normalizeWhiteSpace(gendiff(file1, file2, 'plain'))).toMatch(normalizeWhiteSpace(expectedOutput));
});
test('gendiff plain format YML files', () => {
    const file1 = getFixturePath('file1.yml');
    const file2 = getFixturePath('file2.yml');
    const expectedOutput = readFile(getFixturePath('expected_plain.txt'));
    expect(normalizeWhiteSpace(gendiff(file1, file2, 'plain'))).toMatch(normalizeWhiteSpace(expectedOutput));
});
test('gendiff JSON format', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const expectedOutput = readFile(getFixturePath('expected_json.json'));
    expect(normalizeWhiteSpace(gendiff(file1, file2, 'json'))).toMatch(normalizeWhiteSpace(expectedOutput));
});
test('gendiff JSON format with YML files', () => {
    const file1 = getFixturePath('file1.yml');
    const file2 = getFixturePath('file2.yml');
    const expectedOutput = readFile(getFixturePath('expected_json.json'));
    expect(normalizeWhiteSpace(gendiff(file1, file2, 'json'))).toMatch(normalizeWhiteSpace(expectedOutput));
})


