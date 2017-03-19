// Parser
'use strict';

var find = require('lodash.find');
var includes = require('lodash.includes');
var some = require('lodash.some');

var isValidString = function(string) {
  return (string && typeof string === 'string' && string !== '');
};

var Parser = function(data) {
  if (!data || !data.hasOwnProperty('nodes')) {
    return false;
  }
  this.nodes = data.nodes;
  this.selectors = [];
  return this;
};

Parser.prototype.create = function(selector) {
  if (!isValidString(selector)) {
    return this;
  }
  this.find(selector);
  return this;
};

Parser.prototype.splitSelectors = function(selector) {
  if (!isValidString(selector)) {
    return false;
  }
  return selector.split(',').map(function(s) { return s.trim(); });
};

Parser.prototype.find = function(selector) {
  var self = this;
  if (!isValidString(selector)) {
    return false;
  }
  this.selectors = this.nodes.filter(function(n) {
    var selectors = self.splitSelectors(n.selector);
    return some(selectors, function(s) { return s === selector; });
  });
  return this;
};

Parser.prototype.hasProp = function(prop) {
  if (!isValidString(prop) || !this.selectors.length) {
    return false;
  }
  var selector = this.selectors[0];
  return find(selector.nodes, function(p) {
    return p.prop === prop; 
  }).length;
};

Parser.prototype.getProps = function() {
  if (!this.selectors) {
    return false;
  }
  var selector = this.selectors[0];
  return selector.nodes.reduce(function(props, p) {
    props.push({
      prop: p.prop,
      value: p.value,
    });
    return props;
  }, []);
};

Parser.prototype.getProp = function(prop) {
  if (!isValidString(prop) || !this.selectors.length) {
    return false;
  }
  var selector = this.selectors[0];
  var prop = this.getPropData(prop);
  if (!prop) { return false; }
  return prop.value;
};

Parser.prototype.getPropData = function(prop) {
  if (!isValidString(prop) || !this.selectors.length) {
    return false;
  }
  var selector = this.selectors[0];
  return find(selector.nodes, function(p) {
    return p.prop === prop || false; 
  });
};

module.exports = Parser;
