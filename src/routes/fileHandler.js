// @ts-check
'use strict';

// DEPENDENCIES
const router = require('express').Router();

// USER IMPORTS
const getUploadsDirectory = require('../util/getUploadsDirectory');

router.get('*', (req, res) => {
  const filepath = req.params[0];

  getUploadsDirectory(filepath)
    .then(files => {
      res.render('files', { filepath, files });
    })
    .catch(error => {
      res.statusMessage = 'File or directory not found';
      res.status(404).render('files', { filepath, error } );
    });
});

module.exports = router;
