const emmet = require('../vendor/emmet');
const isString = require('./isString');

const sanitize = (selectors = '') => {
  return selectors.trim()
    .replace(/\ > \ /g, ' ')
    .replace(/>/g, ' ')
    .replace(/\ \ \ \ /g, ' ')
    .replace(/\ \ \ /g, ' ')
    .replace(/\ \ /g, ' ')
    .replace(/\ /g, ' > ');
};

const renderer = (document, selectors) => {
  if (!document || !isString(selectors)) {
    return;
  }

  return emmet(document, sanitize(selectors));
};

module.exports = renderer;
