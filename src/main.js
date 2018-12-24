// @ts-check
'use strict';

// DEPENDENCIES
const express = require('express');
const helmet = require('helmet');

// NATIVE IMPORTS
const path = require('path');

// UTILITY FUNCTIONS
const getUploadsDirectory = require('./util/getUploadsDirectory');
const getServerDetails = require('./util/getServerDetails');

// Global constants
const { HOSTNAME, PORT } = getServerDetails();

// Express app instance
const app = express();

// Use EJS as temple rendering engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Log each request
app.use((req, res, next) => {
  console.group(`${new Date()}`);
  console.log(`User-agent: ${req.headers['user-agent']}`);
  console.log(`From IP: ${req.ip}`);
  console.log(`Request: ${req.method} ${req.url}`);
  console.groupEnd();
  next();
});

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
app.use(helmet.noCache());
app.use(helmet.referrerPolicy({
  policy: 'no-referrer'
}));

// Load static assets
app.use(express.static('public', {
  dotfiles: 'deny'
}));

// Serve home page
app.get('/', (req, res) => {
  res.render('index');
});

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
