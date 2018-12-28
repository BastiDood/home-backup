'use strict';

/**
 * Logs all incoming requests.
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next - Next middleware function
 */
function logRequests(req, res, next) {
  console.group(`${new Date()}`);
  console.log(`User-agent: ${req.headers['user-agent']}`);
  console.log(`From IP: ${req.ip}`);
  console.log(`Request: ${req.method} ${req.url}`);
  console.groupEnd();
  next();
}

module.exports = logRequests;
