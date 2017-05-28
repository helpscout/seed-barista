const emmet = require('../vendor/emmet');
const isString = require('./isString');
const sanitizeForEmmet = require('./cssSelector').sanitizeForEmmet;
const hasProp = require('./object').hasProp;

const renderer = (document = false, selectors = '') => {
  if (!document || !hasProp(document, 'location') || !isString(selectors)) {
    return false;
  }

  return emmet(document, sanitizeForEmmet(selectors));
};

module.exports = renderer;
