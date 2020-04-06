'use strict';

// DEPENDENCIES
const express = require('express');
const helmet = require('helmet');
const noCache = require('nocache');

// NATIVE IMPORTS
const path = require('path');

// ROUTES
const fileHandler = require('./routes/fileHandler');

// MIDDLEWARES
const logRequests = require('./middlewares/logRequests');

// UTILITY FUNCTIONS
const getServerDetails = require('./util/getServerDetails');
const getUploadsDirectory = require('./util/getUploadsDirectory');

// Global constants
const { HOSTNAME, PORT } = getServerDetails();

// Express app instance
const app = express();

// Use EJS as temple rendering engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Log each request
app.use(logRequests);

// Enable security headers by Helmet
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.contentSecurityPolicy({
  directives: {
    formAction: ['\'self\''],
    defaultSrc: ['\'self\''],
    frameAncestors: ['\'none\'']
  }
}));
app.use(noCache());
app.use(helmet.referrerPolicy({
  policy: 'no-referrer'
}));

// Load static assets
app.use(express.static(
  path.join(__dirname, '../public'),
  {
    dotfiles: 'deny'
  }
));

// Serve home page
app.get('/', (req, res) => {
  res.render('index');
});

// Serve file system
app.use('/files', fileHandler);

// File not found
app.use((req, res) => {
  res.statusMessage = 'Not Found';
  res.status(404).render('error', {
    errCode: res.statusCode,
    errMessage: res.statusMessage
  });
});

// Handle server errors
app.use((err, req, res, next) => {
  if (err) console.error(err);
  res.statusMessage = 'Internal Server Error';
  res.status(500).render('error', {
    errCode: res.statusCode,
    errMessage: res.statusMessage
  });
  next();
});

app.listen(PORT, HOSTNAME);
console.log(`Running server at: http://${HOSTNAME}:${PORT}`);
console.log(`Uploads directory at: ${getUploadsDirectory()}`);
