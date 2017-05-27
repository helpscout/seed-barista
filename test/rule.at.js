// Test :: Rule :: At
'use strict';

var expect = require('chai').expect;
var barista = require('../index');

describe('barista output.rule', function() {
  describe('at', function() {
    var styles = `
      .machi {
        color: red;
        @media (min-width: 32em) {
          color: hotpink;
        }
        @media (min-width: 42em) {
          color: rebeccapurple;
        }
        @media (min-width: 48em) {
          color: purple;
        }
        @media (min-width: 60em) {
          color: blue;
        }
      }
    `;
    var output = barista({
      content: styles,
    });
    var rule = output.rule('.machi');

    it('should return props from a media query', function() {
      expect(rule.atRules.length).to.equal(4);
      expect(rule.at('(min-width: 32em)').prop('color')).to.equal('hotpink');
      expect(rule.at('(min-width: 48em)').prop('color')).to.equal('purple');
      expect(rule.at('(min-width: 60em)').prop('color')).to.equal('blue');
    });

    it('should return props from a media query without parentheses', function() {
      expect(rule.at('min-width: 32em').prop('color')).to.equal('hotpink');
      expect(rule.at('min-width: 48em').prop('color')).to.equal('purple');
      expect(rule.at('min-width: 60em').prop('color')).to.equal('blue');
    });

    it('should return first matched rule a media query array', function() {
      expect(rule.at(['min']).prop('color')).to.equal('hotpink');
      expect(rule.at(['32']).prop('color')).to.equal('hotpink');
      expect(rule.at(['3']).prop('color')).to.equal('hotpink');
      expect(rule.at(['2']).prop('color')).to.equal('hotpink');
      expect(rule.at(['42']).prop('color')).to.equal('rebeccapurple');
    });

    it('should return props from a media query keywords passed as an array', function() {
      expect(rule.at(['min', '32em']).prop('color')).to.equal('hotpink');
      expect(rule.at(['min', '48em']).prop('color')).to.equal('purple');
      expect(rule.at(['min', '60em']).prop('color')).to.equal('blue');
    });

    it('should return false if media query string is too vague', function() {
      expect(rule.at('min')).to.be.false
    });

    it('should return false if media query doesn\'t exist', function() {
      expect(rule.at('(min-width: 8000000em)')).to.be.false;
      expect(rule.at('(max-width: 42em)')).to.be.false;
      expect(rule.at('max-width: 42em')).to.be.false;
      expect(rule.at(['max', '48em'])).to.be.false;
      expect(rule.at(['4333px'])).to.be.false;
      expect(rule.at(['4231', 'max', 'min', 'tv'])).to.be.false;
    });
  });
});
