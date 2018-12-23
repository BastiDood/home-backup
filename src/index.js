'use strict';

// DEPENDENCIES
const express = require('express');
const helmet = require('helmet');

// NATIVE IMPORTS
const path = require('path');

// MIDDLEWARES
const logRequests = require('./middlewares/logRequests');

// UTILITY FUNCTIONS
const getServerDetails = require('./util/getServerDetails');

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
  res.status(404);
  res.statusMessage = 'Not Found';
  res.render('error', {
    errCode: res.statusCode,
    errMessage: res.statusMessage
  });
});

app.listen(PORT, HOSTNAME);
console.log(`Running server at: http://${HOSTNAME}:${PORT}`);
