// @ts-check
'use strict';

// NATIVE IMPORTS
const fs = require('fs');
const path = require('path');

// MODULE IMPORTS
const FileEntry = require('../data-types/FileEntry');

// Global Constants
const UPLOADS_DIRECTORY = path.resolve(__dirname, '../../public/uploads');

function getUploadsDirectory(pathQuery) {
  return new Promise((resolve, reject) => {
    const ABSOLUTE_PATH_QUERY = path.join(UPLOADS_DIRECTORY, pathQuery);

    fs.readdir(
      ABSOLUTE_PATH_QUERY,
      {
        withFileTypes: true
      },
      (err, entries) => {
        if (err) reject(err);

        // Transform directories and files
        const directories = entries
          .filter(entry => entry.isDirectory())
          .map(entry => new FileEntry(
            'Folder',
            path.join(ABSOLUTE_PATH_QUERY, entry.name)
          ));
        const files = entries
          .filter(entry => entry.isFile())
          .map(entry => {
            const fileType = path.extname(entry.name);

            return new FileEntry(
              `${fileType} File`,
              path.join(ABSOLUTE_PATH_QUERY, entry.name)
            );
          });

        resolve([ directories, files ]);
      }
    );
  });
}

module.exports = getUploadsDirectory;
