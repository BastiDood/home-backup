'use strict';

// NATIVE IMPORTS
const os = require('os');

// DEPENDENCIES
const dotenv = require('dotenv');
dotenv.config();

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
  const { address } = os.networkInterfaces()['Wi-Fi'][1];
  const port = Number(process.env.PORT);
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (isDevelopment) {
    return {
      HOSTNAME: '127.0.0.1',
      PORT: 80
    };
  }

  // Checks if the IP address does not exist
  if (!address) throw new Error('The local IP address (Wi-Fi) does not exist.');

  return {
    HOSTNAME: address,
    PORT: port
  };
}

module.exports = getServerDetails;
