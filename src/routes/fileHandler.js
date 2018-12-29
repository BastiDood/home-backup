// @ts-check
'use strict';

// NATIVE IMPORTS
const fs = require('fs');
const path = require('path');

// DEPENDENCIES
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const multer = require('multer');

// MIDDLEWARES
const renderFileSystem = require('../middlewares/renderFileSystem');

// Global Constants
const UPLOADS_DIRECTORY = path.resolve(__dirname, '../../public/uploads');

// Body Parser Configuration
const jsonParser = bodyParser.json();

// Multer Configuration
const storage = multer.diskStorage({
  /**
   * The required callback from Multer.
   * @callback destCb
   * @param {Error | null} err - The Error object
   * @param {string} destination - Path to the directory for uploading
   */
  /**
   * Dynamically sets the upload destination of the file.
   * @param {express.Request} req - The Request object
   * @param {Express.Multer.File} file - The Multer file object
   * @param {destCb} cb - Callback function that checks for errors
   * and sets the upload path
   */
  destination(req, file, cb) {
    const pathQuery = req.params[0];
    cb(
      null,
      path.join(UPLOADS_DIRECTORY, pathQuery)
    );
  },
  filename(req, file, cb) {
    const { originalname } = file;
    const parsedFile = path.parse(originalname);
    cb(null, `${parsedFile.name}-${Date.now()}${parsedFile.ext}`);
  }
});

// Initialize Uploader
const upload = multer({ storage }).array('filesUpload');

// Intercept static files
router.use(express.static(
  UPLOADS_DIRECTORY,
  {
    dotfiles: 'deny'
  }
));

// Intercept all routes from /files/*
router.route('*')
  .get(renderFileSystem)
  .post(
    jsonParser,
    (req, res, next) => {
      const pathQuery = req.params[0];

      // Check if request is for directory creation
      if (req.body.mkDir) {
        const { PATH_TO_NEW_FOLDER } = req.body;
        const SAVE_TO = path.relative(
          '/files/',
          PATH_TO_NEW_FOLDER
        );
        const ENCODED_DESTINATION = path.join(
          UPLOADS_DIRECTORY,
          SAVE_TO
        );
        const DESTINATION = decodeURIComponent(ENCODED_DESTINATION);
        fs.mkdir(DESTINATION, err => {
          if (err === null) res.status(201).json({
            isSuccessful: true
          });
          else res.status(409).json({
            isSuccessfulL: false,
            errCode: err.code
          });
        });
        return;
      }

      // Manage file uploads
      const redirectPath = path.posix.join('/files', pathQuery);
      upload(req, res, err => {
        if (err) next(err);
        res.redirect(redirectPath);
      });
    }
  );

module.exports = router;
