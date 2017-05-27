const postcss = require('postcss');

const parse = (css = false) => {
  if (!css) {
    return false;
  }
  return postcss.parse(css);
};

module.exports = {
  parse,
  postcss,
};
