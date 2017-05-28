// Barista ☕️

const Rule = require('./rule');
const Output = require('./output');
const sass = require('./utils/sass');
const defaultOptions = require('./defaults/barista');
const defaultOutputOptions = require('./defaults/output');
const cssFile = require('./utils/cssFile');
const cssom = require('./utils/cssom');
const resolve = require('./utils/resolve');
const isValid = require('./utils/isValid');

const barista = (o = defaultOptions) => {
  if (!isValid.options(o)) {
    return false;
  }

  const options = Object.assign({}, defaultOptions, o);
  options.includePaths = resolve.sassPaths(options);

  if (options.file && !cssFile.exists(options, options.file)) {
    return false;
  }

  // Render the sass/css with node-sass
  const css = sass.render(options);

  const enableCSSOM = options.enableCSSOM;
  const data = enableCSSOM ? cssom.parse(css) : false;
  const includePaths = options.includePaths;
  const rule = (selector) => {
    return enableCSSOM ? new Rule(data).create(selector) : false;
  };

  const outputOptions = Object.assign({}, defaultOptions, {
    $: rule, // Deprecated alias
    css,
    data,
    includePaths,
    rule,
  });

  return new Output(outputOptions);
};

module.exports = barista;
