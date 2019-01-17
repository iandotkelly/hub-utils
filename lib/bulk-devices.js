
'use strict'

/**
 * Creates an object representing a device to create
 *
 * @param  {string} deviceId   The id of the device
 * @return {object}            the device object
 */
function createDevice(deviceId, includeFolders) {
  const base = {
    deviceId: deviceId,
    brokers: [
      {
        type: 'DanlawTcp',
        commands: 'standard',
        imei: deviceId
      },{
        type: "DanlawUdp"
      }
    ],
    tracing: 'full',
    enabled: true
  };

  if (includeFolders) {
    base.configurationFolderName = 'cfgFolder';
    base.firmwareFolderName = 'fwFolder';
  }

  return base;
}

function updateDevice(deviceId) {
  return {
    deviceId,
    enabled: false,
    tracing: 'minimal'
  }
}

/**
 * Common validation for the bulk-device methods
 * @param  {Object} config
 * @return                 Nothing, or an exception on an error
 */
function commonValidation(config) {
  if (!config) {
    throw new Error('configuration is required')
  }

  if (typeof config.rangeStart !== 'number' || typeof config.rangeEnd !== 'number') {
    throw new Error('rangeStart and rangeEnd numbers required')
  }

  config.length = config.rangeEnd - config.rangeStart + 1;
  if (config.length < 1) {
    throw new Error('Range defined must leave at least 1 device to be created');
  }
}

/**
 * Create an array of IDs starting
 *
 * @param  {Number} start  Start ID
 * @param  {Number} length Number of sequential IDs to create
 * @param  {String} prefix Prefix to add to ids
 * @return {Array}         Array of IDs
 */
function ids(start, length, prefix) {
  return [...Array(length).keys()].map(value => prefix + (value + start).toString())
}

/**
 * Create a large number of device creation objects
 * @param  {object} config  Configuration
 * @return {object}
 */
function bulkDeviceCreate(config) {
  commonValidation(config);
  return {
    devices: ids(config.rangeStart, config.length, config.prefix || '').map(
      (id) => createDevice(id, config.includeFolders)
  )}
}

/**
 * Create a device delete object with lots of IDs
 *
 * @param  {object} config Configuration
 * @return {object}
 */
function bulkDeviceDelete(config) {
  commonValidation(config);
  return { deviceIds: ids(config.rangeStart, config.length, config.prefix || '') }
}

/**
 * Create a device update object
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
function bulkDeviceUpdate(config) {
  commonValidation(config);
  return { devices: ids(config.rangeStart, config.length, config.prefix || '').map(updateDevice) }
}

function bulkTagOperations(config) {
  commonValidation(config)
  return { deviceIds: ids(config.rangeStart, config.length, config.prefix || '') }
}

module.exports = {
  create: bulkDeviceCreate,
  delete: bulkDeviceDelete,
  update: bulkDeviceUpdate,
  tags: bulkTagOperations,
}
