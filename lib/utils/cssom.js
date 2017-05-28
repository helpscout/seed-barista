const postcss = require('postcss');

const parse = (css = false) => {
  if (!css || typeof css !== 'string') {
    return false;
  }
  return postcss.parse(css);
};

module.exports = {
  parse,
};
