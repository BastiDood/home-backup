// @ts-check
'use strict';

// DEPENDENCIES
const router = require('express').Router();

// USER IMPORTS
const getUploadsDirectory = require('../util/getUploadsDirectory');

router.get('*', (req, res) => {
  getUploadsDirectory()
    .then(files => {
      res.render('files', {
        files,
        filepath: req.params[0]
      });
    })
    .catch(console.error);
});

module.exports = router;
