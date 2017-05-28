const fs = require('fs');
const path = require('path');
const defaultOptions = require('../defaults/barista');
const isString = require('./isString');

const getPath = (options = defaults, file = '') => {
  if (!options || !isString(file)) {
    return false;
  }
  const {
    root,
    src,
  } = options;

  return path.join(root, src, file);
};

const exists = (options = defaults, file = '') => {
  if (!options || !isString(file)) {
    return false;
  }

  return fs.existsSync(getPath(options, file));
};


module.exports = {
  exists,
  getPath,
};
