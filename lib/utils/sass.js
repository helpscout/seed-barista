const nodeSass = require('node-sass');
const pathfinder = require('sass-pathfinder');
const cssFile = require('./cssFile');
const defaultOptions = require('../defaults/barista');
const isString = require('./isString');

const getOptions = (o = defaultOptions) => {
  const {
    content,
    includePaths,
    includeSeedPaths,
    file,
    root,
    src,
  } = o;
  const opts = {
    includePaths: pathfinder(includePaths),
  };
  // Update sassOptions with user defined options
  if (content) {
    opts.data = content;
  } else if (file) {
    opts.file = cssFile.getPath(o, file);
  }

  if (includeSeedPaths) {
    opts.includePaths = pathfinder([
      includePaths,
      includeSeedPaths,
    ]);
  }
  opts.includePaths = opts.includePaths.filter(p => isString(p));

  return opts;
};

const render = (o = {}) => {
  const opts = getOptions(o);

  return opts ? nodeSass.renderSync(opts).css.toString() : false;
};

module.exports = {
  getOptions,
  render,
};
