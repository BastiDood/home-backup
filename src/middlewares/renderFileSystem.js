'use strict';

// MODULE IMPORTS
const getUploadsDirectory = require('../util/getUploadsDirectory');

/**
 * 
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next - Function to call the next middleware
 */
function renderFileSystem(req, res, next) {
  const pathQuery = req.params[0];
  const isRoot = pathQuery === '/';
  getUploadsDirectory(pathQuery)
    .then(([ directories, files ]) => {
      res.render('files', {
        pathQuery,
        isRoot,
        directories,
        files
      });
    })
    .catch(error => {
      if (error.code === 'ENOENT') {
        res.statusMessage = 'File or directory not found';
        res.status(404).render('error', {
          errCode: res.statusCode,
          errMessage: res.statusMessage
        });
      } else {
        next(error);
      }
    });
}

module.exports = renderFileSystem;
