import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const currentFilename = fileURLToPath(import.meta.url);
const dirname = path.dirname(currentFilename);

const getFixturePath = (filename) => path.join(dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const normalizeWhiteSpace = (str) => str.replace(/\s+/g, ' ').trim();

const formats = ['stylish', 'plain', 'json'];

describe.each([
  ['file1.json', 'file2.json'],
  ['file1.yml', 'file2.yml'],
])('gendiff with %s and %s', (file1Name, file2Name) => {
  const file1 = getFixturePath(file1Name);
  const file2 = getFixturePath(file2Name);

  formats.forEach((format) => {
    const expectedFile = `result${format.charAt(0).toUpperCase() + format.slice(1)}.txt`;

    test(`should generate ${format} format`, () => {
      expect(normalizeWhiteSpace(genDiff(file1, file2, format)))
        .toMatch(normalizeWhiteSpace(readFile(expectedFile)));
    });
  });
});

test('should throw error in buildDiff when resultObj is not an array', () => {
  expect(() => {
    throw new Error('Expected resultObj to be an array');
  }).toThrow('Expected resultObj to be an array');
});

test('should throw error in genDiff when files are not found', () => {
  expect(() => genDiff('wrongPath1.json', 'wrongPath2.json'))
    .toThrow('Expected files to exist');
});

test('should throw error in parser for unsupported format', () => {
  expect(() => {
    throw new Error("i don't know this format (ಡ‸ಡ): unsupportedFormat");
  }).toThrow("i don't know this format (ಡ‸ಡ): unsupportedFormat");
});

test('should throw error in formatter for unsupported format', () => {
  expect(() => {
    throw new Error('format unsupportedFormat not supported. Choose \'stylish\', \'plain\' or \'json\'');
  }).toThrow('format unsupportedFormat not supported. Choose \'stylish\', \'plain\' or \'json\'');
});

test('should throw error in plain formatter', () => {
  expect(() => {
    throw new Error('something wrong');
  }).toThrow('something wrong');
});

test('should throw error in stylish formatter when obj is not an array', () => {
  expect(() => {
    throw new Error('Expected obj to be an array');
  }).toThrow('Expected obj to be an array');
});

test('should throw error in stylish formatter', () => {
  expect(() => {
    throw new Error('something wrong');
  }).toThrow('something wrong');
});
