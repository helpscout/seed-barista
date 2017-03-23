// Test :: Parser :: Exists
'use strict';

var assert = require('chai').assert;
var barista = require('../index');

describe('barista output.$', function() {

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
      var $o = output.$('.one');

      assert.isOk($o.exists());
    });

    it('should return false if class doesn\'t exists', function() {
      var $o = output.$('.two');

      assert.isNotOk($o.exists());
    });

  });

});
