// Barista ☕️

const Rule = require('./rule');
const Output = require('./output');
const sass = require('./utils/sass');
const defaultOptions = require('./defaults/options');
const defaultOutputOptions = require('./defaults/outputOptions');
const cssom = require('./utils/cssom');
const resolve = require('./utils/resolve');
const isValid = require('./utils/isValid');

const barista = (o = defaultOptions) => {
  if (!isValid.options(o)) {
    return false;
  }

  const options = Object.assign({}, defaultOptions, o);

  options.includePaths = resolve.sassPaths(options);
  // Setup node-sass options
  const sassOptions = sass.options(options);
  if (!sassOptions) {
    return false;
  }

  const {
    enableCSSOM,
    includePaths,
    seedIncludePaths,
  } = options;

  // Render the sass/css with node-sass
  const css = sass.render(sassOptions);
  const data = enableCSSOM ? cssom.parse(css) : false;
  const rule = (selector) => {
    if (enableCSSOM) {
      return new Rule(data).create(selector);
    } else {
      return false
    };
  };

  let outputOptions = Object.assign({}, defaultOptions, {
    $: rule, // Deprecated alias
    data,
    rule,
    css,
    includePaths,
    seedIncludePaths,
  });

  return new Output(outputOptions);
};

module.exports = barista;
