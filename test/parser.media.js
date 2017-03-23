// Test :: Parser :: Media
'use strict';

var assert = require('chai').assert;
var barista = require('../index');

describe('barista output.$', function() {

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
      var $o = output.$('.one--sm');

      assert.isOk($o.selectors.length);
      assert.equal($o.getProp('background'), 'red');
    });

    it('should find class within media print query', function() {
      var $o = output.$('.one--print');

      assert.isOk($o.selectors.length);
      assert.equal($o.getProp('background'), 'yellow');
    });

    it('should get media query details with $.media() method', function() {
      var $o = output.$('.one--sm');
      var media = $o.media();

      assert.isOk(media);
      assert.isOk(media.params.indexOf('max-width') >= 0);
    });

    it('should return false with $.media() selector has no media queries', function() {
      var $o = output.$('.zero');
      var media = $o.media();

      assert.isNotOk(media);
    });
  });

});
