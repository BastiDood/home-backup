// @ts-check
'use strict';

// NATIVE IMPORTS
const path = require('path');

// DEPENDENCIES
const express = require('express');
const router = express.Router();

// UTILITY FUNCTIONS
const getUploadsDirectory = require('../util/getUploadsDirectory');

// Intercept static files
router.use(express.static(
  path.join(__dirname, '../../public/uploads'),
  {
    dotfiles: 'deny'
  }
));

// Intercept all routes from /files/*
router.route('*')
  .get((req, res, next) => {
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
  });

module.exports = router;
