// Output
'use strict';

var renderer = require('./renderer');
var genki = require('genki');

var BaristaOutput = function(options) {
  this.$ = false;
  this.css = false;
  this.data = false;
  this.includePaths = false;
  this.rule = false;
  this.seed = false;

  this.dom = false;
  this.window = false;
  this.document = false;
  this.mounted = false;

  this.initialize(options);

  return this;
};

BaristaOutput.prototype.initialize = function(options) {
  if (options && typeof options === 'object') {
    this.$ = options.$;
    this.css =  options.css;
    this.data = options.data;
    this.includePaths = options.includePaths;
    this.rule = options.rule;
    this.seed = options.seed;
  }

  return this;
};

BaristaOutput.prototype.isSelectorValid = function(selectors) {
  if (!this.mounted) {
    console.warn('Barista: .mount() is required');
    return false;
  }
  if (!selectors || typeof selectors !== 'string') {
    console.warn(`Barista: only accepts HTML selectors (strings). Example: .find('.button')`);
    return false;
  }

  return true;
};

BaristaOutput.prototype.append = function(selectors) {
  if (!this.isSelectorValid(selectors)) {
    return false;
  }
  this.document.body.appendChild(renderer(this.document, selectors));

  return this;
};

BaristaOutput.prototype.appendHTML = function(markup) {
  if (!this.isSelectorValid(markup)) {
    return false;
  }
  this.dom.$('body').append(markup);

  return this;
};

BaristaOutput.prototype.find = function(selectors) {
  if (!this.isSelectorValid(selectors)) {
    return false;
  }
  this.render(selectors);

  return this.dom.$(selectors);
};

BaristaOutput.prototype.html = function(markup) {
  if (!this.isSelectorValid(markup)) {
    return false;
  }
  this.dom.$('body').html(markup);

  return this;
};

BaristaOutput.prototype.render = function(selectors) {
  if (!this.isSelectorValid(selectors)) {
    return false;
  }
  this.document.body.innerHTML = '';
  this.append(selectors);

  return this;
};

BaristaOutput.prototype.addjQueryMethods = function() {
  var self = this;
  if (!this.mounted) {
    return false;
  }

  this.dom.$.prototype.prop = this.dom.$.prototype.css;

  return this;
};

BaristaOutput.prototype.mount = function() {
  this.dom = genki.start({
    content: this.css,
  });
  this.window = this.dom.window;
  this.document = this.dom.document;
  this.mounted = true;

  this.addjQueryMethods();

  return this;
};

module.exports = BaristaOutput;
