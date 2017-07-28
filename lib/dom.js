// Abstracted from Genki
// https://github.com/itsjonq/genki

const JSDOM = require('jsdom').JSDOM;
const jQuery = require('jquery');
const isString = require('./utils/isString');

class DOM {
  constructor(styles) {
    if (!isString(styles)) {
      return false;
    }

    this.$ = false;
    this.document = false;
    this.jQuery = false;
    this.window = false;
    this.styles = [];

    this.generate(styles);

    return this;
  }

  generate(styles) {
    const dom = new JSDOM('<html><head></head><body></body></html>');
    const window = dom.window;
    const document = dom.window.document;
    /* istanbul ignore next */
    const $ = global.document ? jQuery : jQuery(window);

    this.window = window;
    this.document = document;
    this.$ = this.jQuery = $;
    this.addStyle(styles);
    this.addAliasMethods();

    return this;
  }

  addAliasMethods() {
    this.$.prototype.prop = this.$.prototype.css;

    return this;
  }

  addStyle(styles) {
    const head = this.document.getElementsByTagName('head')[0];
    const s = this.document.createElement('style');
    s.innerHTML = styles;
    head.appendChild(s);
    this.styles.push(styles);

    return this;
  }
}

module.exports = DOM;
