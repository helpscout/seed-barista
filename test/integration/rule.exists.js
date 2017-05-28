/* globals barista: true, expect: true, describe: true, it: true, sinon: true */
'use strict';

describe('output.rule', function() {
  describe('exists', function() {
    var styles = `
      .one {
        background: blue;
      };
    `;
    var output = barista({
      content: styles,
    });

    it('should return true if class exists', function() {
      var ruleo = output.rule('.one');

      assert.isOk(ruleo.exists());
    });

    it('should return false if class doesn\'t exists', function() {
      var ruleo = output.rule('.two');

      assert.isNotOk(ruleo.exists());
    });

  });

});
