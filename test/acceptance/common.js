/* globals barista: true, expect: true, describe: true, it: true, sinon: true */
var barista = require('../../index');
var expect = require('chai').expect;

describe('acceptance', function() {
  describe('common.js', function() {
    it('should execute with common.js require', function() {
      var styles = `
        .one { background: blue };
        .one.mod { background: red };
      `;
      var output = barista({
        content: styles,
      });

      expect(output.rule('.one').prop('background')).to.equal('blue');
    });

    it('should execute mounted with common.js require', function() {
      var styles = `
        .one { background: blue };
        .one.mod { background: red };
      `;
      var output = barista({
        content: styles,
      }).mount();

      expect(output.find('.one').prop('background')).to.equal('blue');
    });
  });
});
