var path = require('path');
var pathfinder = require('sass-pathfinder');

var files = pathfinder([
  require('seed-button'),
  require('seed-dropdown'),
  require('seed-nav'),
  require('seed-publish'),
  path.join(__dirname, 'scss')
]);

module.exports = files;
