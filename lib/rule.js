// Rule
'use strict';

var flatten = require('lodash.flatten');
var find = require('lodash.find');
var some = require('lodash.some');
var mqParser = require('css-mq-parser');

var isValidString = function(string) {
  return (string && typeof string === 'string' && string !== '');
};

var Rule = function(data) {
  if (!data || !data.hasOwnProperty('nodes')) {
    return false;
  } else if (data && data.type === 'rule') {
    this.selectors = [data];
  } else {
    this.selectors = [];
  }
  this.nodes = data.nodes;
  this.atRules = [];
  return this;
};

Rule.prototype.create = function(selector) {
  if (!isValidString(selector)) {
    return this;
  }
  this.find(selector);
  return this;
};

Rule.prototype.at = function(mediaQuery) {
  if (!isValidString(mediaQuery) && !Array.isArray(mediaQuery)) {
    return false;
  }
  var selector = false;

  if (typeof mediaQuery === 'string') {
    // Find by String
    selector = find(this.atRules, function(rule) {
      var param = rule.parent.params.toLowerCase().replace(/\(|\)/g, '');
      var match = mediaQuery.toLowerCase().replace(/\(|\)/g, '');

      return param === match;
    });
  }
  // Find by Array
  if (Array.isArray(mediaQuery)) {
    selector = find(this.atRules, function(rule) {
      var param = rule.parent.params.toLowerCase();
      var matches = mediaQuery.filter(function(m) { return param.indexOf(m.toLowerCase()) >= 0; });
      return matches.length === mediaQuery.length;
    });
  }

  return selector ? new Rule(selector) : false;
};

Rule.prototype.getParamNodes = function() {
  return flatten(this.nodes.reduce(function(nodeList, n) {
    if (n.params) {
      nodeList.push(flatten(n.nodes));
    }
    return nodeList;
  }, []));
};

Rule.prototype.splitSelectors = function(selector) {
  if (!isValidString(selector)) {
    return false;
  }
  return selector.split(',').map(function(s) { return s.trim(); });
};

Rule.prototype.findSelector = function(nodes, selector) {
  var self = this;
  if (!nodes || !selector || !isValidString(selector)) {
    return false;
  }
  return nodes.filter(function(n) {
    var selectors = self.splitSelectors(n.selector);
    return some(selectors, function(s) {
      return s.replace(/\\/g, '') === selector.replace(/\\/g, '');
    });
  });
};

Rule.prototype.find = function(selector) {
  if (!isValidString(selector)) {
    return false;
  }
  // First pass
  var results = this.findSelector(this.nodes, selector);
  this.findAtRules(selector);
  // Second pass: Media queries
  if (!results.length) {
    results = this.atRules;
  }

  this.selectors = results;
  return this;
};

Rule.prototype.findAtRules = function(selector) {
  if (!isValidString(selector)) {
    return false;
  }
  var paramNodes = this.getParamNodes();
  var rules = this.findSelector(paramNodes, selector);
  this.atRules = rules;

  return this;
};

Rule.prototype.exists = function() {
  if (!this.selectors) {
    return false;
  }
  return this.selectors.length > 0;
};

Rule.prototype.hasProp = function(prop) {
  return this.getProp(prop) !== false;
};

Rule.prototype.getProps = function() {
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

Rule.prototype.props = function(prop) {
  return this.getProps(prop);
};

Rule.prototype.getProp = function(prop) {
  if (!isValidString(prop) || !this.selectors.length) {
    return false;
  }
  prop = this.getPropData(prop);
  if (!prop) { return false; }
  return prop.value;
};

Rule.prototype.prop = function(prop) {
  return this.getProp(prop);
};

Rule.prototype.getPropData = function(prop) {
  if (!isValidString(prop) || !this.selectors.length) {
    return false;
  }
  var selector = this.selectors[0];
  return find(selector.nodes, function(p) {
    return p.prop === prop || false; 
  });
};

Rule.prototype.propData = function(prop) {
  return this.getPropData(prop);
};

Rule.prototype.media = function() {
  if (!this.selectors.length) {
    return false;
  }
  var selector = this.selectors[0];
  if (!selector.parent || selector.parent.type !== 'atrule') {
    return false;
  }
  return selector.parent;
};

Rule.prototype.mediaQuery = function() {
  var media = this.media();
  if (!media) {
    return false;
  }
  var query = mqParser(media.params)[0];

  return {
    rule: media.params,
    type: query.type,
    not: query.inverse,
    props: query.expressions,
  }
};

Rule.prototype.mq = function() {
  return this.mediaQuery();
};

module.exports = Rule;
