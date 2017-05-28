/* globals barista: true, expect: true, describe: true, it: true, sinon: true */
'use strict';

describe('output.mount', function() {
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
