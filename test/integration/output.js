/* globals barista: true, expect: true, describe: true, it: true, sinon: true */
'use strict';

describe('output', function() {
  describe('.css', function() {
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
        src: 'test/integration/scss',
        file: 'simple-css.scss'
      });
      var expect = typeof(output.css) === 'string';

      assert.isOk(expect);
    });
  });

  describe('.data', function() {
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
        src: 'test/integration/scss',
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
