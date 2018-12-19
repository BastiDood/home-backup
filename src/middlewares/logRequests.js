'use strict';

/**
 * Logs the IP address and the requested resouce of the incoming request.
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
function logRequests(req, res, next) {
  console.log(`Request from: ${req.ip}`);
  console.log(`Accessing: ${req.url}`);
  next();
}

module.exports = logRequests;
