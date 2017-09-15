
'use strict'

/**
 * Creates an object representing a device to create
 *
 * @param  {string} deviceId   The id of the device
 * @return {object}            the device object
 */
function createDevice(deviceId) {
  return {
    deviceId: deviceId,
    brokers: [
      {
        type: 'DanlawTcp',
        commands: 'standard',
        imei: deviceId,
        configurationFolderName: 'cfgFolder',
        firmwareFolderName: 'fwFolder'
      },{
        type: "DanlawUdp"
      }
    ],
    tracing: 'full',
    enabled: true
  }
}

/**
 * Create an array of IDs starting
 *
 * @param  {Number} start  Start ID
 * @param  {Number} length Number of sequential IDs to create
 * @return {Array}         Array of IDs
 */
function ids(start, length) {
  return [...Array(length).keys()].map(value => (value + start).toString())
}

/**
 * Create a large number of device creation objects
 * @param  {object} config  Configuration
 * @return {object}
 */
function bulkDeviceCreate(config) {

  if (!config) {
    throw new Error('configuration is required')
  }

  if (typeof config.rangeStart !== 'number' || typeof config.rangeEnd !== 'number') {
    throw new Error('rangeStart and rangeEnd numbers required')
  }

  const length = config.rangeEnd - config.rangeStart + 1;
  if (length < 1) {
    throw new Error('Range defined must leave at least 1 device to be created');
  }

  // create te devices
  return { devices: ids(config.rangeStart, length).map(createDevice) }
}

/**
 * Create a device delete object with lots of IDs
 *
 * @param  {object} config Configuration
 * @return {object}
 */
function bulkDeviceDelete(config) {

    if (!config) {
      throw new Error('configuration is required')
    }

    if (typeof config.rangeStart !== 'number' || typeof config.rangeEnd !== 'number') {
      throw new Error('rangeStart and rangeEnd numbers required')
    }

    const length = config.rangeEnd - config.rangeStart + 1;
    if (length < 1) {
      throw new Error('Range defined must leave at least 1 device to be created');
    }

    return { deviceIds: ids(config.rangeStart, length) }
}

module.exports = {
  create: bulkDeviceCreate,
  delete: bulkDeviceDelete,
}
