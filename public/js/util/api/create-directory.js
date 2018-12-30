/**
 * @typedef {Object} ServerResponse
 * @property {boolean} isSuccessful - Status of
 * directory creation
 * @property {string} [mtime] - Last modified time of
 * the directory
 * @property {string} [errCode] - NodeJS error code
 * @property {string} [errMsg] - Error message
 */
/**
 * @typedef {Object} DirectoryCreationResult
 * @property {number} status - Status code of response
 * @property {ServerResponse} json - Server response JSON
 */
/**
 * Tells the server to create a new directory based
 * on the given path.
 * @param {string} endpoint - Path to the
 * new folder relative to the website root
 * @returns {Promise<DirectoryCreationResult>}
 */
function createDirectory(endpoint) {
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      mkDir: true,
      pathToNewFolder: endpoint
    })
  })
    .then(res => {
      return res.json()
        .then(json => ({
          status: res.status,
          /** @type {ServerResponse} */
          json
        }));
    });
}

export default createDirectory;
