// Barista ☕️

require('babel-register')();
const barista = require('./lib/barista');

module.exports = barista;
// For ES2015 default import
module.exports.default = barista;
