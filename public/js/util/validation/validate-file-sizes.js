// Maximum file size of array
const MAX_UPLOAD_SIZE = Number(require('dotenv').config().parsed.MAX_UPLOAD_SIZE);

/**
 * Checks if an array of files has a total size
 * less than the `maxSize`.
 * @param {File[]} files - Array from `FileList`
 * @returns {boolean} Validation result
 */
function validateFileSize(files) {
  const totalSize = files
    .reduce((prev, curr) => prev + curr.size, 0);

  if (files.length && totalSize <= MAX_UPLOAD_SIZE) return true;
  else return false;
}

export default validateFileSize;
