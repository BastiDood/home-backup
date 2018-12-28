// @ts-check
'use strict';

// NATIVE IMPORTS
const path = require('path');

// DEPENDENCIES
const express = require('express');
const router = express.Router();
const multer = require('multer');

// MIDDLEWARES
const renderFileSystem = require('../middlewares/renderFileSystem');

// Global Constants
const UPLOADS_DIRECTORY = path.resolve(__dirname, '../../public/uploads');

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
    (req, res, next) => {
      const pathQuery = req.params[0];
      const redirectPath = path.posix.join(pathQuery, 'files');
      upload(req, res, err => {
        if (err) next(err);
        res.redirect(redirectPath);
      });
    }
  );

module.exports = router;
