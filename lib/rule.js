// Rule
const flatten = require('lodash.flatten');
const cssSelector = require('./utils/cssSelector');
const cssom = require('./utils/cssom');
const isString = require('./utils/isString');
const mediaQuery = require('./utils/mediaQuery');
const hasProp = require('./utils/object').hasProp;

class Rule {
  constructor(data) {
    if (!data || !hasProp(data, 'nodes')) {
      return false;
    }

    this.atRules = [];
    this.nodes = data.nodes;
    this.selectors = cssom.isRule(data) ? [data] : [];

    // Aliases
    this.prop = this.getProp;
    this.propData = this.getPropData;
    this.props = this.getProps;
    this.mq = this.mediaQuery;

    return this;
  }

  create(selector) {
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
  }

  at(keywords) {
    let selector = '';

    if (isString(keywords)) {
      selector = cssom.findSelectorFromParamsByString(this.atRules, keywords);
    } else if (Array.isArray(keywords)) {
      selector = cssom.findSelectorFromParamsByArray(this.atRules, keywords);
    }

    return new Rule(selector);
  }

  exists() {
    return this.selectors ? this.selectors.length > 0 : false;
  }

  hasProp(prop) {
    return this.getProp(prop) !== false;
  }

  getProps() {
    const selector = this.selectors[0];

    return cssom.getPropsFromSelector(selector);
  }

  getProp(p) {
    const prop = this.getPropData(p);

    return prop ? prop.value : false;
  }

  getPropData(prop) {
    const selector = this.selectors[0];

    return cssom.getPropDataFromSelector(selector, prop);
  }

  media() {
    const selector = this.selectors[0]

    return cssom.getAtRuleFromSelector(selector);
  }

  mediaQuery() {
    const media = this.media();
    const params = media.params;

    return mediaQuery.data(media, params);
  }
}

module.exports = Rule;
