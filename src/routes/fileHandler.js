// @ts-check
'use strict';

// DEPENDENCIES
const router = require('express').Router();

// USER IMPORTS
const getUploadsDirectory = require('../util/getUploadsDirectory');

// Intercepts all routes from /files/*
router.route('*')
  .get((req, res) => {
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
          throw error;
        }
      });
  });

module.exports = router;
