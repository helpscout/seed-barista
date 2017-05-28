// Output
const genki = require('genki');
const DOM = require('./dom')
const renderer = require('./utils/renderer');
const defaultOptions = require('./defaults/output');
const isString = require('./utils/isString');

class Output {
  constructor(o = defaultOptions) {
    this.dom = false;
    this.window = false;
    this.document = false;
    this.mounted = false;

    const options = Object.assign({}, defaultOptions, o);
    const {
      $,
      css,
      data,
      includePaths,
      rule,
    } = options;

    this.$ = $;
    this.css = css;
    this.data = data;
    this.includePaths = includePaths;
    this.rule = rule;

    return this;
  }

  isSelectorValid(selectors) {
    return this.mounted && isString(selectors);
  }

  append(selectors) {
    if (!this.isSelectorValid(selectors)) {
      return false;
    }
    this.document.body.appendChild(renderer(this.document, selectors));

    return this;
  }

  appendHTML(markup) {
    if (!this.isSelectorValid(markup)) {
      return false;
    }
    this.dom.$('body').append(markup);

    return this;
  }

  find(selectors) {
    if (!this.isSelectorValid(selectors)) {
      return false;
    }
    this.render(selectors);

    return this.dom.$(selectors);
  }

  html(markup) {
    if (!this.isSelectorValid(markup)) {
      return false;
    }
    this.dom.$('body').html(markup);

    return this;
  }

  render(selectors) {
    if (!this.isSelectorValid(selectors)) {
      return false;
    }
    this.document.body.innerHTML = '';
    this.append(selectors);

    return this;
  }

  mount() {
    this.dom = new DOM(this.css);
    this.window = this.dom.window;
    this.document = this.dom.document;
    this.mounted = true;

    return this;
  }
}

module.exports = Output;
