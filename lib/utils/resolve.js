const harvester = require('seed-harvester');
const pathfinder = require('sass-pathfinder');
const path = require('path');
const defaultOptions = require('../defaults/barista');
const isString = require('./isString');
const hasProp = require('./object').hasProp;

const stripRoot = (root = defaultOptions.root, p = '') => {
  if (!isString(root) || !isString(p)) {
    return false;
  }

  return p.replace(new RegExp(root, 'g'), '');
}

const pathname = (root = defaultOptions.root, p = '') => {
  if (!isString(root) || !isString(p)) {
    return false;
  }

  return path.join(root, stripRoot(root, p));
};

const includePaths = (root = defaultOptions.root, o = []) => {
  if (!isString(root) || !Array.isArray(o)) {
    return [];
  }

  return pathfinder(o).reduce((list, i) => {
    list.push(pathname(root, i));
    return list;
  }, []);
};

const seedPaths = (pack = false) => {
  return isString(pack) ? harvester([pack]) : harvester();
};

const srcPaths = (root = defaultOptions.root, src = '') => {
  if (!isString(root) || !isString(src)) {
    return [];
  }

  return [pathname(root, src)];
};

const sassPaths = (o = defaultOptions) => {
  const paths = [];

  if (hasProp(o, 'includePaths') && hasProp(o, 'root')) {
    paths.push(includePaths(o.root, o.includePaths));
  }
  if (hasProp(o, 'includeSeedPaths') && o.includeSeedPaths === true) {
    paths.push(seedPaths(o.pack));
  }
  if (hasProp(o, 'src') && hasProp(o, 'root')) {
    paths.push(srcPaths(o.root, o.src));
  }

  return pathfinder(paths);
};

module.exports = {
  includePaths,
  pathname,
  sassPaths,
  seedPaths,
  srcPaths,
  stripRoot,
};
