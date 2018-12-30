'use strict';

// NATIVE IMPORTS
const fs = require('fs');
const path = require('path');

// MODULE IMPORTS
const FileEntry = require('../data-types/FileEntry');

// Global Constants
const UPLOADS_DIRECTORY = path.resolve(__dirname, '../../public/uploads');

/**
 * Given the relative path from the URL search parameters, this function gets the
 * contents of the directory relative to the `UPLOADS_DIRECTORY`.
 * @param {string} pathQuery - Relative path as dictated by the URL search parameters
 * @returns {Promise<Array<FileEntry[]>>} An array containing two arrays containing
 * the directory and file objects, respectively
 */
function getUploadsDirectory(pathQuery) {
  return new Promise((resolve, reject) => {
    const ABSOLUTE_PATH_QUERY = path.join(UPLOADS_DIRECTORY, pathQuery);

    // Creates the uploads folder if it does not exist
    fs.mkdir(UPLOADS_DIRECTORY, err => {
      if (err !== null && err.code !== 'EEXIST') throw err;
      fs.readdir(
        ABSOLUTE_PATH_QUERY,
        {
          withFileTypes: true
        },
        (err, entries) => {
          if (err) {
            reject(err);
            return;
          }

          // Transform directories and files
          const directories = entries
            .filter(entry => entry.isDirectory())
            .map(entry => new FileEntry(
              'Folder',
              path.join(ABSOLUTE_PATH_QUERY, entry.name)
            ));
          const files = entries
            .filter(entry => entry.isFile())
            .map(entry => new FileEntry(
              path.extname(entry.name),
              path.join(ABSOLUTE_PATH_QUERY, entry.name)
            ));
  
          resolve([ directories, files ]);
        }
      );
    });
  });
}

module.exports = getUploadsDirectory;
