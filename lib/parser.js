// Parser
'use strict';

var find = require('lodash.find');
var includes = require('lodash.includes');

var Parser = function(nodes) {
  this.data = nodes;
  this.nodes = this.data.nodes;
  this.s = false;
  return this;
};

Parser.prototype.find = function(selector) {
  if (!selector || typeof selector !== 'string') {
    return false;
  }
  var results = this.nodes.filter(function(n) {
    return includes(n.selector, selector);
  });
  this.s = [results[0]];
  return this;
};

Parser.prototype.findAll = function(selector) {
  if (!selector || typeof selector !== 'string') {
    return false;
  }
  var results = this.nodes.filter(function(n) {
    return includes(n.selector, selector);
  });
  this.s = results;
  return this;
};

Parser.prototype.findExact = function(selector) {
  if (!selector || typeof selector !== 'string') {
    return false;
  }
  var results = this.nodes.filter(function(n) {
    return n.selector === selector;
  });
  this.s = [results[0]];
  return this;
};

Parser.prototype.hasProp = function(prop) {
  if (!this.s) { return false; }
  var selector = this.s[0];
  return find(selector.nodes, function(p) {
    return p.prop === prop; 
  }).length;
};

Parser.prototype.getProps = function() {
  if (!this.s) { return false; }
  var selector = this.s[0];
  return selector.nodes.reduce(function(props, p) {
    props.push({
      prop: p.prop,
      value: p.value,
    });
    return props;
  }, []);
};

Parser.prototype.getProp = function(prop) {
  if (!this.s) { return false; }
  var selector = this.s[0];
  return find(selector.nodes, function(p) {
    return p.prop === prop || false; 
  });
};

Parser.prototype.getPropValue = function(prop) {
  if (!this.s) { return false; }
  var selector = this.s[0];
  var prop = this.getProp(prop);
  if (!prop) { return false; }
  return prop.value;
};

module.exports = Parser;
