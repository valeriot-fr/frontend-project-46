import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const normalizeWhiteSpace = (str) => str.replace(/\s+/g, ' ').trim();

describe.each([
  ['file1.json', 'file2.json', 'resultTree.txt'],
  ['file1.yml', 'file2.yml', 'resultTree.txt'],
])('gendiff with %s and %s', (file1Name, file2Name, expectedFile) => {
  const file1 = getFixturePath(file1Name);
  const file2 = getFixturePath(file2Name);
  const expected = readFile(expectedFile);

  test('should generate default format', () => {
    expect(normalizeWhiteSpace(genDiff(file1, file2))).toMatch(normalizeWhiteSpace(expected));
  });
});

describe.each([
  ['file1.json', 'file2.json', 'resultPlain.txt', 'plain'],
  ['file1.yml', 'file2.yml', 'resultPlain.txt', 'plain'],
])('gendiff with %s and %s in plain format', (file1Name, file2Name, expectedFile, format) => {
  const file1 = getFixturePath(file1Name);
  const file2 = getFixturePath(file2Name);
  const expected = readFile(expectedFile);

  test('should generate plain format', () => {
    expect(normalizeWhiteSpace(genDiff(file1, file2, format)))
    .toMatch(normalizeWhiteSpace(expected));
  });
});

describe.each([
  ['file1.json', 'file2.json', 'resultJSON.txt', 'json'],
  ['file1.yml', 'file2.yml', 'resultJSON.txt', 'json'],
])('gendiff with %s and %s in json format', (file1Name, file2Name, expectedFile, format) => {
  const file1 = getFixturePath(file1Name);
  const file2 = getFixturePath(file2Name);
  const expected = readFile(expectedFile);

  test('should generate json format', () => {
    expect(normalizeWhiteSpace(genDiff(file1, file2, format)))
    .toMatch(normalizeWhiteSpace(expected));
  });
});