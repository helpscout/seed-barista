const nodeSass = require('node-sass');
const pathfinder = require('sass-pathfinder');
const cssFile = require('./cssFile');
const defaultOptions = require('../defaults/barista');
const isString = require('./isString');

const getOptions = (o = defaultOptions) => {
  if (!o || typeof o !== 'object') {
    return false;
  }
  const options = Object.assign({}, defaultOptions, o);

  const {
    content,
    includePaths,
    includeSeedPaths,
    file,
    root,
    src,
  } = options;
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

  return content || file ? opts : false;
};

const render = (o) => {
  if (!o || typeof o !== 'object') {
    return false;
  }
  const opts = getOptions(o);

  return nodeSass.renderSync(opts).css.toString();
};

module.exports = {
  getOptions,
  render,
};
