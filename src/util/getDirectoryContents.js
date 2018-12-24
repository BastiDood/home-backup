// @ts-check
'use strict';

// NATIVE IMPORTS
const fs = require('fs');
const path = require('path');

function getDirectoryContents() {
  return new Promise((resolve, reject) => {
    fs.readdir(
      path.join(__dirname, '../../../public/uploads'),
      (err, files) => {
        if (err) reject(err);
        resolve(files);
      }
    );
  });
}

module.exports = getDirectoryContents;
