// @ts-check
'use strict';

// NATIVE IMPORTS
const path = require('path');

// DEPENDENCIES
const express = require('express');
const router = express.Router();
const multer = require('multer');

// UTILITY FUNCTIONS
const getUploadsDirectory = require('../util/getUploadsDirectory');

// Global Constants
const UPLOADS_DIRECTORY = path.resolve(__dirname, '../../public/uploads');

// Multer Configuration
const storage = multer.diskStorage({
  destination: UPLOADS_DIRECTORY,
  filename(req, file, cb) {
    const { originalname } = file;
    const ext = path.extname(originalname);

    cb(null, `${originalname}-${Date.now()}${ext}`);
  }
});

// Initialize Uploader
const upload = multer({
  storage
});

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
  })
  .post(
    upload.array('filesUpload'),
    (req, res) => {
      console.log(req.file);
      res.send('File sent.');
    }
  );

module.exports = router;
