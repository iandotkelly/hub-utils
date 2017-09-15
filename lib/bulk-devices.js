
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
 * Create a large number of device creation objects
 * @param  {object} config  Configuration
 * @return {array}
 */
function bulkdevices(config) {

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

  // get an index of ids
  var ids = [...Array(length).keys()].map(value => (value + config.rangeStart).toString())
  // create te devices
  return { devices: ids.map(createDevice) }
}

module.exports = bulkdevices
