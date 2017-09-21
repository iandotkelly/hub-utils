#!/usr/bin/env node
/* eslint no-console: "off", node/shebang: "off" */

'use strict';

var program = require('commander');
var bulk = require('./lib/bulk-devices');
var pjson = require('./package.json')

program
  .version(pjson.version)

program
  .command('create-devices <startrange> <endrange> [idprefix]')
  .option('-p, --pretty', 'Pretty print json')
  .description('create device creation object for hub-management')
  .action((rangeStart, rangeEnd, idprefix, options) => {
    const result = bulk.create({
      rangeStart: Number(rangeStart),
      rangeEnd: Number(rangeEnd),
      prefix: idprefix
    });
    console.log(options.pretty ? JSON.stringify(result, null, '  ') : JSON.stringify(result))
  })

  program
    .command('delete-devices <startrange> <endrange> [idprefix]')
    .option('-p, --pretty', 'Pretty print json')
    .description('create device-deletion object for hub-management')
    .action((rangeStart, rangeEnd, idprefix, options) => {
      const result = bulk.delete({
        rangeStart: Number(rangeStart),
        rangeEnd: Number(rangeEnd),
        prefix: idprefix
      });
      console.log(options.pretty ? JSON.stringify(result, null, '  ') : JSON.stringify(result))
    })

program
  .command('*')
  .action(() => {
    console.error('Unknown command')
  })

program.parse(process.argv)
