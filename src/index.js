'use strict';

// DEPENDENCIES
const express = require('express');
const helmet = require('helmet');

// USER IMPORTS
const getServerDetails = require('./util/getServerDetails');

// Global constants
const { HOSTNAME, PORT } = getServerDetails();

// Express app instance
const app = express();

// Log each request
app.use('*', (req, res, next) => {
  console.log(`Request from: ${req.ip}`);
  console.log(`Accessing: ${req.url}`);
  next();
});

// Enable security headers by Helmet
app.use(helmet());

// Load static assets
app.use(express.static('public', {
  dotfiles: 'deny'
}));

app.listen(PORT, HOSTNAME);
console.log(`Running server at: http://${HOSTNAME}:${PORT}`);
