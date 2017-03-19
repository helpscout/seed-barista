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

      assert.isOk(expect);
    });

    it('should return a string from a parsed file', function() {
      var output = barista({
        file: 'simple-css.scss'
      });
      var expect = typeof(output.css) === 'string';

      assert.isOk(expect);
    });
  });

  describe('output.data', function() {
    it('should return an object from parsed content', function() {
      var styles = '.klass { background: blue };';
      var output = barista({
        content: styles,
      });
      var expect = typeof(output.data) === 'object';

      assert.isOk(expect);
    });

    it('should return an object from a parsed file', function() {
      var output = barista({
        file: 'simple-css.scss'
      });
      var expect = typeof(output.data) === 'object';

      assert.isOk(expect);
    });

    it('should return a PostCSS AST root', function() {
      var styles = '.klass { background: blue };';
      var output = barista({
        content: styles,
      }).data;

      assert.equal(output.type, 'root');
    });

    it('should return a CSS tree with a correct selector/property/value structure', function() {
      var styles = '.klass { background: blue };';
      var output = barista({
        content: styles,
      }).data;
      var selectorData = output.nodes[0];

      assert.equal(selectorData.selector, '.klass');
      assert.equal(selectorData.nodes[0].prop, 'background');
      assert.equal(selectorData.nodes[0].value, 'blue');
    });
  });
});
