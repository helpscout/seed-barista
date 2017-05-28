// Rule
const flatten = require('lodash.flatten');
const cssSelector = require('./utils/cssSelector');
const cssom = require('./utils/cssom');
const isString = require('./utils/isString');
const mediaQuery = require('./utils/mediaQuery');
const hasProp = require('./utils/object').hasProp;

const Rule = function(data) {
  if (!data || !hasProp(data, 'nodes')) {
    return false;
  }

  this.atRules = [];
  this.nodes = data.nodes;
  this.selectors = cssom.isRule(data) ? [data] : [];

  return this;
};

Rule.prototype.create = function(selector) {
  if (isString(selector)) {
    // First pass
    let results = cssom.findSelectorsFromNodes(this.nodes, selector);
    this.atRules = cssom.getAtRules(this.nodes, selector);
    // Second pass: Media queries
    if (!results.length) {
      results = this.atRules;
    }

    this.selectors = results;
  }

  return this;
};

Rule.prototype.at = function(keywords) {
  let selector = false;

  if (isString(keywords)) {
    selector = cssom.findSelectorFromParamsByString(this.atRules, keywords);
  }
  if (Array.isArray(keywords)) {
    selector = cssom.findSelectorFromParamsByArray(this.atRules, keywords);
  }

  return selector ? new Rule(selector) : false;
};


Rule.prototype.exists = function() {
  return this.selectors.length > 0;
};

Rule.prototype.hasProp = function(prop) {
  return this.getProp(prop) !== false;
};

Rule.prototype.getProps = function() {
  const selector = this.selectors[0];

  return cssom.getPropsFromSelector(selector);
};


Rule.prototype.getProp = function(p) {
  const prop = this.getPropData(p);

  return prop ? prop.value : false;
};

Rule.prototype.getPropData = function(prop) {
  const selector = this.selectors[0];

  return cssom.getPropDataFromSelector(selector, prop);
};


Rule.prototype.media = function() {
  const selector = this.selectors[0]

  return cssom.getAtRuleFromSelector(selector);
};

Rule.prototype.mediaQuery = function() {
  const media = this.media();
  const params = media.params;

  return mediaQuery.data(media, params);
};

// Aliases
Rule.prototype.prop = Rule.prototype.getProp;
Rule.prototype.propData = Rule.prototype.getPropData;
Rule.prototype.props = Rule.prototype.getProps;
Rule.prototype.mq = Rule.prototype.mediaQuery;

module.exports = Rule;
