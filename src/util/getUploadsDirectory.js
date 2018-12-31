'use strict';

// DEPENDENCIES
const dotenv = require('dotenv');
dotenv.config();

// NATIVE IMPORTS
const path = require('path');

/**
 * Gets the uploads directory relative to the module's file name.
 * @returns {string} Absolute path of uploads directory
 */
function getUploadsDirectory() {
  const fromDotenv = process.env.UPLOADS_DIRECTORY;
  return (!fromDotenv || fromDotenv === '')
    ? path.resolve(__dirname, '../../public/uploads')
    : fromDotenv;
}

module.exports = getUploadsDirectory;
