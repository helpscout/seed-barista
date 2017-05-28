const fs = require('fs');
const path = require('path');
const defaultOptions = require('../defaults/barista');
const hasProp = require('./object').hasProp;
const isString = require('./isString');

const getPath = (options = defaultOptions, file = '') => {
  if (!options || !isString(file)) {
    return false;
  }
  if (!hasProp(options, 'root') || !hasProp(options, 'src')) {
    return false;
  }

  const {
    root,
    src,
  } = options;

  return path.join(root, src, file);
};

const exists = (options = defaultOptions, file = '') => {
  if (!options || !isString(file)) {
    return false;
  }

  return fs.existsSync(getPath(options, file));
};


module.exports = {
  exists,
  getPath,
};
