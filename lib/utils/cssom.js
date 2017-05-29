const flatten = require('lodash.flatten');
const postcss = require('postcss');
const cssSelector = require('./cssSelector');
const hasProp = require('./object').hasProp;
const isString = require('./isString');

const isNestedRule = (rule = {}) => {
  return rule && hasProp(rule, 'parent');
};

const isRule = (rule = {}) => {
  return rule && hasProp(rule, 'type') && rule.type === 'rule';
};

const isSelector = (selector = {}) => {
  return selector && hasProp(selector, 'nodes');
};

const parse = (css) => {
  if (!isString(css)) {
    return false;
  }

  return postcss.parse(css);
};

const findSelectorsFromNodes = (nodes = [], selector = '') => {
  if (!Array.isArray(nodes) || !isString(selector)) {
    return false;
  }

  return nodes.filter((n) => {
    const selectors = cssSelector.split(n.selector);
    return cssSelector.inList(selectors, selector);
  });
};

const findSelectorFromParamsByString = (rules = [], keywords = '') => {
  if (!Array.isArray(rules) || !isString(keywords)) {
    return false;
  }

  return rules.find(rule => {
    const param = sanitizeParens(getRuleParams(rule));
    const match = sanitizeParens(keywords);

    return param === match;
  });
};

const findSelectorFromParamsByArray = (rules = [], keywords = []) => {
  if (!Array.isArray(rules) || !Array.isArray(keywords)) {
    return false;
  }

  return rules.find(rule => {
    const param = getRuleParams(rule);
    const matches = keywords.filter(m => {
      return param.indexOf(m.toLowerCase()) >= 0;
    });

    return matches.length === keywords.length;
  });
};

const getAtRuleFromSelector = (selector = {}) => {
  if (!isNestedRule(selector)) {
    return false;
  }
  const parent = selector.parent;

  return parent.type === 'atrule' ? parent : false;
};

const getParamNodes = (nodes = []) => {
  if (!Array.isArray(nodes)) {
    return [];
  }

  return flatten(nodes.reduce((nodeList, node) => {
    if (node.params) {
      nodeList.push(flatten(node.nodes));
    }
    return nodeList;
  }, []));
};

const getPropsFromSelector = (selector = {}) => {
  if (!isSelector(selector)) {
    return false;
  }

  return selector.nodes.reduce((props, p) => {
    const {
      prop,
      value,
    } = p;

    props.push({
      prop,
      value,
    });

    return props;
  }, []);
};

const getPropDataFromSelector = (selector = {}, prop = '') => {
  if (!isSelector(selector) || !isString(prop)) {
    return false;
  }

  return selector.nodes.find(p => p.prop === prop);
};

const getRuleParams = (rule = false) => {
  if (!isNestedRule(rule) || !hasProp(rule.parent, 'params')) {
    return false;
  }

  return rule.parent.params;
};

const getAtRules = (nodes = [], selector = '') => {
  if (!Array.isArray(nodes) || !isString(selector)) {
    return [];
  }

  return findSelectorsFromNodes(getParamNodes(nodes), selector);
};

const sanitizeParens = (rule) => {
  if (!isString(rule)) {
    return rule;
  }

  return rule.toLowerCase().replace(/\(|\)/g, '');
};

module.exports = {
  findSelectorFromParamsByArray,
  findSelectorFromParamsByString,
  findSelectorsFromNodes,
  getAtRuleFromSelector,
  getAtRules,
  getParamNodes,
  getPropDataFromSelector,
  getPropsFromSelector,
  getRuleParams,
  isNestedRule,
  isRule,
  isSelector,
  parse,
  sanitizeParens,
};
