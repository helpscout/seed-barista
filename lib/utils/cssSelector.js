const isString = require('./isString');

const inList = (list = [], selector = '') => {
  if (!isString(selector) || !Array.isArray(list)) {
    return false;
  }

  return list.some(s => {
    return s.replace(/\\/g, '') === selector.replace(/\\/g, '');
  });
};

const sanitizeForEmmet = (selectors = '') => {
  if (!isString(selectors)) {
    return false;
  }

  return selectors.trim()
    .replace(/\ > \ /g, ' ')
    .replace(/>/g, ' ')
    .replace(/\ \ \ \ /g, ' ')
    .replace(/\ \ \ /g, ' ')
    .replace(/\ \ /g, ' ')
    .replace(/\ /g, ' > ');
};

const split = (selector = '') => {
  if (!isString(selector)) {
    return false;
  }

  return selector.split(',').map(s => s.trim());
};

module.exports = {
  inList,
  sanitizeForEmmet,
  split,
};
