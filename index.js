/* eslint no-console: "off" */

'use strict';

var program = require('commander');
var bulk = require('./lib/bulk-devices');
var pjson = require('./package.json')

program
  .version(pjson.version)

program
  .command('devices [startrange] [endrange]')
  .option('-p, --pretty', 'Pretty print json')
  .description('create json array of devices to create')
  .action((rangeStart, rangeEnd, options) => {
    const result = bulk({
      rangeStart: Number(rangeStart),
      rangeEnd: Number(rangeEnd)
    });
    console.log(options.pretty ? JSON.stringify(result, null, '  ') : JSON.stringify(result))
  })

program
  .command('*')
  .action(() => {
    console.error('Unknown command')
  })

program.parse(process.argv)
