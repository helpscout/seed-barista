// Test :: Barista
'use strict';

var assert = require('chai').assert;
var barista = require('../index');

describe('barista output', function() {

  describe('output.css', function() {
    it('should return a string from parsed content', function() {
      var styles = '.klass { background: blue };';
      var output = barista({
        content: styles,
      });
      var expect = typeof(output.css) === 'string';
      assert.equal(expect, true);
    });

    it('should return a string from a parsed file', function() {
      var output = barista({
        file: 'simple-css.scss'
      });
      var expect = typeof(output.css) === 'string';
      assert.equal(expect, true);
    });
  });

  describe('output.data', function() {
    it('should return an object from parsed content', function() {
      var styles = '.klass { background: blue };';
      var output = barista({
        content: styles,
      });
      var expect = typeof(output.data) === 'object';
      assert.equal(expect, true);
    });

    it('should return an object from a parsed file', function() {
      var output = barista({
        file: 'simple-css.scss'
      });
      var expect = typeof(output.data) === 'object';
      assert.equal(expect, true);
    });

    it('should return an parsed CSS tree object', function() {
      var styles = '.klass { background: blue };';
      var output = barista({
        content: styles,
      }).data;

      assert.equal(output.type, 'stylesheet');
    });

    it('should return a CSS tree with a correct selector/property/value structure', function() {
      var styles = '.klass { background: blue };';
      var output = barista({
        content: styles,
      }).data;
      var selectorData = output.stylesheet.rules[0];

      assert.equal(selectorData.selectors[0], '.klass');
      assert.equal(selectorData.declarations[0].property, 'background');
      assert.equal(selectorData.declarations[0].value, 'blue');
    });
  });
});
