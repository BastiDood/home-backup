'use strict';

/**
 * Curried function that converts bytes according
 * to given order of magnitude
 * @param {number} factor - Sets the order of magnitude
 * @param {'KB'|'MB'|'GB'} suffix - Appropriate unit suffix
 * @returns {(fileSize: number) => string} Resulting function
 * that converts `fileSize` to given order of magnitude
 */
function convertBytes(factor, suffix) {
  /**
   * Convert bytes and appends suffix
   * @param {number} fileSize - Size in bytes
   * @returns {string} Converted bytes with appended suffix
   */
  function toConversion(fileSize) {
    return `${(fileSize / factor).toFixed(2)} ${suffix}`;
  }
  return toConversion;
}
const toKB = convertBytes(1e3, 'KB');
const toMB = convertBytes(1e6, 'MB');
const toGB = convertBytes(1e9, 'GB');

module.exports = { toKB, toMB, toGB };
