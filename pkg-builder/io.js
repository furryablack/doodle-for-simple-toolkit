/* eslint-disable import/no-extraneous-dependencies */
const { promisify } = require('util');
const fs = require('fs');

const { IO } = module.exports = { IO: {} };

IO.writeFile = promisify(fs.writeFile);
IO.copyFile = promisify(fs.copyFile);
IO.existsSync = promisify(fs.existsSync);
