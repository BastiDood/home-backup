// @ts-check
'use strict';

// NATIVE IMPORTS
const fs = require('fs');
const path = require('path');

// Global Constants
const UPLOADS_DIRECTORY = path.join(__dirname, '../../public/uploads');

function getUploadsDirectory(filepath) {
  return new Promise((resolve, reject) => {
    fs.readdir(
      path.join(UPLOADS_DIRECTORY, filepath),
      {
        withFileTypes: true
      },
      (err, entries) => {
        if (err) reject(err);

        // Filter directories and files
        const directories = entries.filter(entry => entry.isDirectory());
        const files = entries.filter(entry => entry.isFile());

        resolve([ directories, files ]);
      }
    );
  });
}

module.exports = getUploadsDirectory;
