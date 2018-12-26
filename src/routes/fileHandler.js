// @ts-check
'use strict';

// NATIVE IMPORTS
const path = require('path');

// DEPENDENCIES
const express = require('express');
const router = express.Router();

// USER IMPORTS
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
    const filepath = req.params[0];
    getUploadsDirectory(filepath)
      .then(files => {
        res.render('files', { filepath, files });
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
