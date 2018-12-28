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
    const ext = path.extname(originalname);

    cb(null, `${originalname}-${Date.now()}${ext}`);
  }
});

// Initialize Uploader
const upload = multer({ storage });

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
    upload.array('filesUpload'),
    renderFileSystem
  );

module.exports = router;
