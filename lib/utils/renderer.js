const emmet = require('../vendor/emmet');

const sanitize = function(selectors) {
  return selectors.trim()
    .replace(/\ > \ /g, ' ')
    .replace(/>/g, ' ')
    .replace(/\ \ \ \ /g, ' ')
    .replace(/\ \ \ /g, ' ')
    .replace(/\ \ /g, ' ')
    .replace(/\ /g, ' > ');
};

const renderer = function(document, selectors) {
  if (!document) {
    return;
  }
  if (!selectors || typeof selectors !== 'string') {
    return;
  }
  return emmet(document, sanitize(selectors));
};

module.exports = renderer;
