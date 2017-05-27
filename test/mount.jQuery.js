// Test :: Mount :: Prop
'use strict';

var barista = require('../index');
var expect = require('chai').expect;
var sinon = require('sinon');

describe('barista output.mount', function() {
  describe('.dom.$()', function() {
    describe('.prop()', function() {
      it('should be able to get props with .prop()', function() {
        var styles = `
          .one {
            background: blue;
            color: red;
          };
        `;
        var output = barista({
          content: styles,
        }).mount();
        var rule = output.find('.one');

        expect(rule.prop('background')).to.equal('blue');
        expect(rule.prop('color')).to.equal('red');
      });
    });
  });
});
