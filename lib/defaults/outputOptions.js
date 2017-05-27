const defaultOptions = require('./options');

const propTypeFn = () => {
  return false;
};

const options = {
  $: propTypeFn,
  css: '',
  data: {},
  includePaths: defaultOptions.includePaths,
  rule: propTypeFn,
  seed: defaultOptions.seedIncludePaths,
};

module.exports = options;
