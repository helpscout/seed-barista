// Test :: Parser :: Media
'use strict';

var assert = require('chai').assert;
var barista = require('../index');
var expect = require('chai').expect;

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

    it('should find media query classes with backslash in class name', function() {
      var styles = `
        // From seed-flexy
        .o-flexy { box-sizing: border-box; align-items: center; display: flex; justify-content: space-between; }
        @media (min-width: 544px) { .o-flexy\\@sm { align-items: center; display: flex; justify-content: space-between; } }
        @media (min-width: 768px) { .o-flexy\\@md { align-items: center; display: flex; justify-content: space-between; } }
        @media (min-width: 992px) { .o-flexy\\@lg { align-items: center; display: flex; justify-content: space-between; } }
      `;
      var output = barista({
        content: styles,
      });
      var sm = output.rule('.o-flexy@sm');
      var smAt = output.rule('.o-flexy\@sm');
      var smAtSlash = output.rule('.o-flexy\\@sm');

      expect(sm.exists()).to.be.true;
      expect(smAt.exists()).to.be.true;
      expect(smAtSlash.exists()).to.be.true;
      expect(sm.prop('align-items')).to.equal('center');
      expect(sm.prop('display')).to.equal('flex');
      expect(sm.prop('justify-content')).to.equal('space-between');
    });

  });
});
