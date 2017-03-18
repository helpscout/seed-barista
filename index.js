// Seed Barista :: Index
'use strict';

var findRoot = require('find-root');
var sass = require('node-sass');
var path = require('path');
var pathfinder = require('pathfinder');
var _extend = require('./utils/extend');

var root = findRoot(__dirname);
var pathBase = path.basename(__dirname);

var testPath = path.join(root, 'scss/pack/', pathBase),

// Default options
var defaults = {
  testDir: path.join(root, 'test', 'scss'),
  includePaths: pathfinder([require(path.join(root, 'index')),testPath,]);
  testPath: path.join(root, 'scss/pack/', pathBase),
  file: null,
  data: null,
};

module.exports = function(options) {
  if (!options.file && !options.data) {
    console.log('seed-barista: "data" or "file" key must be defined in options');
    return false;
  }
  options = _extend(defaults, options);

  var sassOption = {
    includePaths: option.includePaths,
  };
  // Update sassOptions with user defined options
  if (options.data && typeof options.data === 'string') {
    sassOption.data = options.data;
  }
  else if (options.file && typeof options.file === 'string') {
    sassOptions.file = path.join(options.testDir, options.file);
  }

  // Render the sass/css with node-sass
  var cssData = sass.renderSync(sassOptions).css.toString();

  return {
    css: cssData,
    model: css.parse(cssData),
  };
};
