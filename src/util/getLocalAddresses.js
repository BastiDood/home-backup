'use strict';

// NATIVE IMPORTS
const os = require('os');

/**
 * Gets all of the local network addresses in the system as filtered by the
 * Regular Expression `^192\.168\.\d+?\.\d+?$`.
 * @returns {string[]} Local addresses as queried from `os.networkInterfaces()`
 * @throws When there are no local addresses found
 */
function getLocalAddresses() {
  const networkInterfaces = os.networkInterfaces();
  const localAddressPattern = /^192\.168\.\d+?\.\d+?$/;
  const localAddresses = Object.values(networkInterfaces)
    .map(ifaces => {
      return ifaces
        .filter(iface => iface.family === 'IPv4')
        .filter(iface => !iface.internal)
        .map(iface => iface.address);
    })
    .reduce((prev, curr) => {
      prev.push(curr[0]);
      return prev;
    }, [])
    .filter(Boolean)
    .filter(address => localAddressPattern.test(address));

  // Checks if the local addresses are empty
  if (!localAddresses.length) throw new Error('No local addresses found.');

  return localAddresses;
}

module.exports = getLocalAddresses;
