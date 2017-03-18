// Seed Barista :: Index
'use strict';

var assign = require('lodash.assign');
var css = require('css');
var findRoot = require('find-root');
var fs = require('fs');
var sass = require('node-sass');
var path = require('path');
var pathfinder = require('sass-pathfinder');

var root = findRoot(__dirname);
var pathBase = path.basename(__dirname);

var testPath = path.join(root, 'scss/pack/', pathBase);

var Barista = function(options) {
  // Default options
  this.defaults = {
    includePaths: pathfinder([require(path.join(root, 'index')),testPath,]),
    src: path.join(root, 'test', 'scss'),
    outputStyle: 'nested',
    pack: testPath,
    file: null,
    data: null,
  };
};

Barista.prototype.isValid = function(options) {
  if (!options || typeof options !== 'object') {
    return false;
  }
  if (!options.file && !options.data) {
    // console.log('seed-barista: "data" or "file" key must be defined in options');
    return false;
  }
  // options.file must be a string
  if (options.file && typeof options.file !== 'string') {
    return false;
  }
  // options.data must be a string
  if (options.data && typeof options.data !== 'string') {
    return false;
  }
  return true;
};

Barista.prototype.order = function(options) {
  if (!this.isValid(options)) {
    return false;
  }
  this.options = assign({}, this.defaults, options);

  var sassOptions = {
    includePaths: this.options.includePaths,
    outputStyle: this.options.outputStyle,
  };
  // Update sassOptions with user defined options
  if (this.options.data) {
    sassOptions.data = this.options.data;
  }
  else if (this.options.file) {
    sassOptions.file = path.join(this.options.src, this.options.file);
    if (!fs.existsSync(sassOptions.file)) {
      // File must exist for node-sass to parse
      return false;
    }
  }

  // Render the sass/css with node-sass
  var cssData = sass.renderSync(sassOptions).css.toString();

  return {
    css: cssData,
    model: css.parse(cssData),
  };
};

module.exports = new Barista();
