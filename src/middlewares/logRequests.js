'use strict';

/**
 * Logs the IP address and the requested resouce of the incoming request.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {Function} next -  The next middleware function to be called by Express.
 */
function logRequests(req, res, next) {
  console.group(`${new Date()}`);
  console.log(`From IP: ${req.ip}`);
  console.log(`Request: ${req.method} ${req.url}`);
  console.groupEnd();
  next();
}

module.exports = logRequests;
