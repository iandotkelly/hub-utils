/* eslint no-console: "off" */

'use strict';

const exec = require('child_process').exec;
const numeral = require('numeral');

const startValues = Array(100).fill().map((_, index) => index * 1000)

startValues.forEach((start, index) => {
  const end = start + 999;
  const indexStr = numeral(index).format('000')
  const startStr = numeral(start).format('00000')
  const endStr = numeral(end).format('00000')
  const command = `node index.js create-devices ${start} ${end} > create-${indexStr}-${startStr}-${endStr}.json`
  exec(command, (err, stdout) => {
    if (err) {
      console.error(err);
      process.exit(1)
    }
  })
})
