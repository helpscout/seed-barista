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

var Barista = function() {
  // Default options
  this.defaults = {
    includePaths: [],
    seedIncludePaths: pathfinder([require(path.join(root, 'index')),testPath,]),
    root: root,
    src: path.join('test', 'scss'),
    outputStyle: 'nested',
    pack: testPath,
    includeSeedPaths: true,
    file: null,
    content: null,
  };
};

Barista.prototype.isValid = function(options) {
  if (!options || typeof options !== 'object') {
    return false;
  }
  if (!options.file && !options.content) {
    // console.log('seed-barista: "content" or "file" key must be defined in options');
    return false;
  }
  // options.file must be a string
  if (options.file && typeof options.file !== 'string') {
    return false;
  }
  // options.content must be a string
  if (options.content && typeof options.content !== 'string') {
    return false;
  }
  return true;
};

Barista.prototype.render = function(options) {
  if (!this.isValid(options)) {
    return false;
  }
  this.options = assign({}, this.defaults, options);

  var sassOptions = {
    includePaths: this.options.includePaths,
  };
  // Update sassOptions with user defined options
  if (this.options.content) {
    sassOptions.data = this.options.content;
  }
  else if (this.options.file) {
    sassOptions.file = path.join(this.options.root, this.options.src, this.options.file);
    if (!fs.existsSync(sassOptions.file)) {
      // File must exist for node-sass to parse
      return false;
    }
  }

  if (this.includeSeedPaths) {
    sassOptions.includePaths = pathfinder([
      this.options.seedIncludePaths, 
      this.options.includePaths,
    ]);
  } else {
    sassOptions.includePaths = pathfinder([
      this.options.includePaths,
    ]);
  }

  // Render the sass/css with node-sass
  var cssData = sass.renderSync(sassOptions).css.toString();

  return {
    css: cssData,
    data: css.parse(cssData),
  };
};

var barista = new Barista();

module.exports = barista.render.bind(barista);
