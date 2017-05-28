const findRoot = require('find-root');
const path = require('path');

const root = findRoot(__dirname).split('/node_modules')[0];
const pathBase = path.basename(root);
const testPath = path.join(root, 'scss/pack/', pathBase);

const options = {
  content: null,
  enableCSSOM: true,
  file: null,
  includePaths: [],
  includeSeedPaths: true,
  outputStyle: 'nested',
  pack: testPath,
  root: root,
  src: path.join('test', 'scss'),
};

module.exports = options;
