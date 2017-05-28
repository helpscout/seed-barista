const harvester = require('seed-harvester');
const pathfinder = require('sass-pathfinder');
const path = require('path');
const defaultOptions = require('../defaults/barista');

const stripRoot = (p = '') => {
  const {
    root,
  } = defaultOptions;
  return p.replace(new RegExp(root, 'g'), '');
}

const pathname = (p = '') => {
  const {
    root,
  } = defaultOptions;
  return path.join(root, stripRoot(p));
};

const includePaths = (o = []) => {
  if (!o.length) {
    return [];
  } else {
    return pathfinder(o).reduce((list, i) => {
      list.push(pathname(i));
      return list;
    }, []);
  }
};

const seedPaths = (pack = false) => {
  if (!pack) {
    return [];
  } else {
    return harvester([pack]);
  }
};

const sassPaths = (o = defaultOptions) => {
  const paths = [includePaths(o.includePaths)];
  if (o.includeSeedPaths) {
    paths.push(seedPaths(o.pack));
  }

  return pathfinder(paths);
};

module.exports = {
  includePaths,
  pathname,
  sassPaths,
  seedPaths,
  stripRoot,
};
