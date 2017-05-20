// Seed Barista :: Index
'use strict';

var assign = require('lodash.assign');
var findRoot = require('find-root');
var fs = require('fs');
var harvester = require('seed-harvester');
var path = require('path');
var pathfinder = require('sass-pathfinder');
var postcss = require('postcss');
var sass = require('node-sass');
var Parser = require('./lib/parser');
var Output = require('./lib/output');

var root = findRoot(__dirname).split('/node_modules')[0];
var pathBase = path.basename(root);
var testPath = path.join(root, 'scss/pack/', pathBase);

var Barista = function() {
  // Default options
  this.defaults = {
    enableCSSOM: true,
    includePaths: [],
    seedIncludePaths: [],
    root: root,
    src: path.join('test', 'scss'),
    outputStyle: 'nested',
    pack: testPath,
    includeSeedPaths: true,
    file: null,
    content: null,
  };
  this.options = {};

  return this;
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
  if (options.file !== undefined && typeof options.file !== 'string') {
    return false;
  }
  // options.content must be a string
  if (options.content !== undefined && typeof options.content !== 'string') {
    return false;
  }
  // options.src must be a string
  if (options.src !== undefined && typeof options.src !== 'string') {
    return false;
  }
  return true;
};

Barista.prototype.resolveSeedPaths = function() {
  var paths = [];

  if (!this.options.seedIncludePaths.length) {
    paths = harvester([this.options.pack,]);
  }
  this.options.seedIncludePaths = paths;

  return this;
};

Barista.prototype.resolveIncludePaths = function() {
  var paths = [];

  if (this.options.includePaths.length) {
    paths = pathfinder(this.options.includePaths).reduce(function(list, i) {
      list.push(path.join(root, i));
      return list;
    }, []);
  }
  this.options.includePaths = paths;

  return this;
};

Barista.prototype.resolvePaths = function() {
  this.resolveSeedPaths();
  this.resolveIncludePaths();

  return this;
};

Barista.prototype.getSassOptions = function() {
  var sassOptions = {
    includePaths: this.options.includePaths,
  };
  // Update sassOptions with user defined options
  if (this.options.content) {
    sassOptions.data = this.options.content;
  } else if (this.options.file) {
    sassOptions.file = path.join(this.options.root, this.options.src, this.options.file);
    if (!fs.existsSync(sassOptions.file)) {
      // File must exist for node-sass to parse
      return false;
    }
  }

  if (this.options.includeSeedPaths) {
    sassOptions.includePaths = pathfinder([
      this.options.seedIncludePaths,
      this.options.includePaths,
    ]);
  } else {
    sassOptions.includePaths = pathfinder([
      this.options.includePaths,
    ]);
  }

  sassOptions.includePaths = sassOptions.includePaths.filter(function(path) {
    return typeof path === 'string';
  });

  return sassOptions;
};

Barista.prototype.getCSSOM = function(cssData) {
  var output = {
    data: false,
    parser: function() {
      return false;
    },
  };

  if (!cssData) {
    return output;
  }

  if (this.options.enableCSSOM) {
    output.data = postcss.parse(cssData);
    output.parser = function(selector) {
      return new Parser(output.data).create(selector);
    };
  }

  return output;
};

Barista.prototype.render = function(options) {
  if (!this.isValid(options)) {
    return false;
  }
  this.options = assign({}, this.defaults, options);
  this.resolvePaths();

  // Setup node-sass options
  var sassOptions = this.getSassOptions();
  if (!sassOptions) {
    return false;
  }
  // Render the sass/css with node-sass
  var cssData = sass.renderSync(sassOptions).css.toString();
  var CSSOM = this.getCSSOM(cssData);

  var o = {
    $: CSSOM.parser, // Deprecated
    css: cssData,
    data: CSSOM.data,
    includePaths: sassOptions.includePaths,
    rule: CSSOM.parser, // Replaces older $ method
    seed: this.options.seedIncludePaths,
  };

  return new Output(o);
};

var barista = function(options) {
  return new Barista().render(options);
};

module.exports = barista;
