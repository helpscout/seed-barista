// Test :: Parser :: Media
'use strict';

var assert = require('chai').assert;
var barista = require('../index');

describe('barista output.rule', function() {

  describe('media queries', function() {
    var styles = `
      .zero {
        background: none;
      }
      .one {
        background: blue;
        @media print {
          &--print {
            background: yellow;
          }
        }
        @media (max-width: 600px) {
          &--sm {
            background: red;
          }
        }

        @media (min-width: 400px) and (max-width: 500px) {
          &--xs {
            background: green;
          }
        }
      };
    `;
    var output = barista({
      content: styles,
    });

    it('should find class within media query', function() {
      var ruleo = output.rule('.one--sm');

      assert.isOk(ruleo.selectors.length);
      assert.equal(ruleo.getProp('background'), 'red');
    });

    it('should find class within media print query', function() {
      var ruleo = output.rule('.one--print');

      assert.isOk(ruleo.selectors.length);
      assert.equal(ruleo.getProp('background'), 'yellow');
    });

    it('should get media query details with rule.media() method', function() {
      var ruleo = output.rule('.one--sm');
      var media = ruleo.media();

      assert.isOk(media);
      assert.isOk(media.params.indexOf('max-width') >= 0);
    });

    it('should return false with rule.media() selector has no media queries', function() {
      var ruleo = output.rule('.zero');
      var media = ruleo.media();

      assert.isNotOk(media);
    });
  });

});
