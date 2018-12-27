'use strict';

// NATIVE IMPORTS
const fs = require('fs');
const path = require('path');

class FileEntry {
  constructor(type, fullPath) {
    const { size, mtime } = fs.lstatSync(fullPath);

    this.name = path.basename(fullPath);
    this.type = type;
    this.size = size;
    this.mtime = mtime;
  }
}

module.exports = FileEntry;
