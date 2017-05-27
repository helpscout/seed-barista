const fs = require('fs');
const nodeSass = require('node-sass');
const path = require('path');
const pathfinder = require('sass-pathfinder');
const defaultOptions = require('../defaults/options');

const sassOptions = (o = defaultOptions) => {
  const {
    content,
    includePaths,
    includeSeedPaths,
    file,
    root,
    src,
  } = o;
  const options = {
    includePaths: pathfinder(includePaths),
  };
  // Update sassOptions with user defined options
  if (content) {
    options.data = content;
  } else if (file) {
    options.file = path.join(root, src, file);
    // File must exist for node-sass to parse
    if (!fs.existsSync(options.file)) {
      return false;
    }
  }

  if (includeSeedPaths) {
    options.includePaths = pathfinder([
      includePaths,
      includeSeedPaths,
    ]);
  }

  options.includePaths = options.includePaths.filter(path => {
    return typeof path === 'string';
  });

  return options;
};

const render = (options = {}) => {
  return nodeSass.renderSync(options).css.toString();
};

module.exports = {
  options: sassOptions,
  render,
};
