// Renderer
'use strict';

var emmet = require('../vendor/emmet');

var sanitize = function(selectors) {
  return selectors.trim()
    .replace(/\ > \ /g, ' ')
    .replace(/>/g, ' ')
    .replace(/\ \ \ \ /g, ' ')
    .replace(/\ \ \ /g, ' ')
    .replace(/\ \ /g, ' ')
    .replace(/\ /g, ' > ');
};

var renderer = function(document, selectors) {
  if (!document) {
    return;
  }
  if (!selectors || typeof selectors !== 'string') {
    return;
  }
  return emmet(document, sanitize(selectors));
};

module.exports = renderer;
