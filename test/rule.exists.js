// Test :: Parser :: Exists
'use strict';

var assert = require('chai').assert;
var barista = require('../index');

describe('barista output.rule', function() {

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
