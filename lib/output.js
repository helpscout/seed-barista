// Output
const genki = require('genki');
const renderer = require('./utils/renderer');
const defaultOptions = require('./defaults/output');

class Output {
  constructor(options = defaultOptions) {
    this.dom = false;
    this.window = false;
    this.document = false;
    this.mounted = false;

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
    if (!this.mounted) {
      console.warn('Barista: .mount() is required');
      return false;
    }
    if (!selectors || typeof selectors !== 'string') {
      console.warn(`Barista: only accepts HTML selectors (strings). Example: .find('.button')`);
      return false;
    }

    return true;
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

  addjQueryMethods() {
    if (!this.mounted) {
      return false;
    }

    this.dom.$.prototype.prop = this.dom.$.prototype.css;

    return this;
  }

  mount() {
    this.dom = genki.start({
      content: this.css,
    });
    this.window = this.dom.window;
    this.document = this.dom.document;
    this.mounted = true;

    this.addjQueryMethods();

    return this;
  }
}

module.exports = Output;
