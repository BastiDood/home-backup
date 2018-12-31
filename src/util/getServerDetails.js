'use strict';

// DEPENDENCIES
const dotenv = require('dotenv');
dotenv.config();

// MODULE IMPORTS
const getLocalAddresses = require('./getLocalAddresses');

/**
 * @typedef {object} ServerDetails
 * @property {string} HOSTNAME - The address to be set for the server.
 * @property {number} PORT - The port to listen to.
 */
/**
 * This function returns the details required to initialize the server.
 * @throws Throws an error if the current local IP address on Wi-Fi does not exist.
 * @returns {ServerDetails} An object representation of the hostname and the port.
 */
function getServerDetails() {
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Check if development environment
  if (!isProduction) {
    return {
      HOSTNAME: '127.0.0.1',
      PORT: 80
    };
  }
  
  // Get production local address
  const port = Number(process.env.PORT);
  const localAddresses = getLocalAddresses();
  const [ address ] = localAddresses;

  return {
    HOSTNAME: address,
    PORT: port
  };
}

module.exports = getServerDetails;
