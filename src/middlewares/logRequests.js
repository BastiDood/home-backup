'use strict';

/**
 * Logs the IP address and the requested resouce of the incoming request.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {Function} next -  The next middleware function to be called by Express.
 */
function logRequests(req, res, next) {
  console.log(`Request from: ${req.ip}`);
  console.log(`Accessing: ${req.url}`);
  next();
}

module.exports = logRequests;
