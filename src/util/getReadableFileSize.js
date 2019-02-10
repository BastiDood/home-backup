'use strict';

// UTILITY FUNCTIONS
const { toKB, toMB, toGB } = require('../util/convertBytes');

/**
   * Returns file size with appropriate precision for readability.
   * @param {number} fileSize - Size in bytes
   * @returns {string} String representation of bytes
   */
function getReadableFileSize(fileSize) {
  if (fileSize >= 75e7) return toGB(fileSize);
  else if (fileSize >= 75e4) return toMB(fileSize);
  else if (fileSize >= 75e1) return toKB(fileSize);
  else return `${fileSize} B`;
}

module.exports = getReadableFileSize;
