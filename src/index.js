'use strict';

// DEPENDENCIES
const express = require('express');
const helmet = require('helmet');

// MIDDLEWARES
const logRequests = require('./middlewares/logRequests');

// UTILITY FUNCTIONS
const getServerDetails = require('./util/getServerDetails');

// Global constants
const { HOSTNAME, PORT } = getServerDetails();

// Express app instance
const app = express();

// Log each request
app.use('*', logRequests);

// Enable security headers by Helmet
app.use(helmet());

// Load static assets
app.use(express.static('public', {
  dotfiles: 'deny'
}));

// File not found
app.use((req, res) => {
  res.status(404);
  res.write('404 Not Found');
  res.end();
});

app.listen(PORT, HOSTNAME);
console.log(`Running server at: http://${HOSTNAME}:${PORT}`);
