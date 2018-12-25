// @ts-check
'use strict';

// NATIVE IMPORTS
const fs = require('fs');
const path = require('path');

function getUploadsDirectory(filepath) {
  return new Promise((resolve, reject) => {
    fs.readdir(
      path.join(__dirname, '../../public/uploads', filepath),
      (err, files) => {
        if (err) reject(err);
        resolve(files);
      }
    );
  });
}

module.exports = getUploadsDirectory;
