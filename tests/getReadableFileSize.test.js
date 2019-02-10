'use strict';

// UTILITY FUNCTIONS
const getReadableFileSize = require('../src/util/getReadableFileSize');

test('Base Case Conversions', () => {
  expect(getReadableFileSize(0)).toBe('0 B');
  expect(getReadableFileSize(56)).toBe('56 B');
  expect(getReadableFileSize(749)).toBe('749 B');
});

test('Kilobyte Conversions', () => {
  expect(getReadableFileSize(750)).toBe('0.75 KB');
  expect(getReadableFileSize(523476)).toBe('523.48 KB');
  expect(getReadableFileSize(749999)).toBe('750.00 KB');
});

test('Megabyte Conversions', () => {
  expect(getReadableFileSize(750000)).toBe('0.75 MB');
  expect(getReadableFileSize(4973441)).toBe('4.97 MB');
  expect(getReadableFileSize(749999999)).toBe('750.00 MB');
});

test('Gigabyte Conversions', () => {
  expect(getReadableFileSize(750000000)).toBe('0.75 GB');
  expect(getReadableFileSize(1003050500)).toBe('1.00 GB');
  expect(getReadableFileSize(78513428345)).toBe('78.51 GB');
});
