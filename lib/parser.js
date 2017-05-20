// Parser
'use strict';

var flatten = require('lodash.flatten');
var find = require('lodash.find');
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

Parser.prototype.getParamNodes = function() {
  return flatten(this.nodes.reduce(function(nodeList, n) {
    if (n.params) {
      nodeList.push(flatten(n.nodes));
    }
    return nodeList;
  }, []));
};

Parser.prototype.splitSelectors = function(selector) {
  if (!isValidString(selector)) {
    return false;
  }
  return selector.split(',').map(function(s) { return s.trim(); });
};

Parser.prototype.findSelector = function(nodes, selector) {
  var self = this;
  if (!nodes || !selector || !isValidString(selector)) {
    return false;
  }
  return nodes.filter(function(n) {
    var selectors = self.splitSelectors(n.selector);
    return some(selectors, function(s) { return s === selector; });
  });
};

Parser.prototype.find = function(selector) {
  if (!isValidString(selector)) {
    return false;
  }
  // First pass
  var results = this.findSelector(this.nodes, selector);
  // Second pass: Media queries
  if (!results.length) {
    var paramNodes = this.getParamNodes();
    results = this.findSelector(paramNodes, selector);
  }

  this.selectors = results;
  return this;
};

Parser.prototype.exists = function() {
  if (!this.selectors) {
    return false;
  }
  return this.selectors.length > 0;
};

Parser.prototype.hasProp = function(prop) {
  return this.getProp(prop) !== false;
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

Parser.prototype.props = function(prop) {
  return this.getProps(prop);
};

Parser.prototype.getProp = function(prop) {
  if (!isValidString(prop) || !this.selectors.length) {
    return false;
  }
  prop = this.getPropData(prop);
  if (!prop) { return false; }
  return prop.value;
};

Parser.prototype.prop = function(prop) {
  return this.getProp(prop);
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

Parser.prototype.propData = function(prop) {
  return this.getPropData(prop);
};

Parser.prototype.media = function() {
  if (!this.selectors.length) {
    return false;
  }
  var selector = this.selectors[0];
  if (!selector.parent || selector.parent.type !== 'atrule') {
    return false;
  }
  return selector.parent;
};

module.exports = Parser;
