// Test :: Parser
'use strict';

var assert = require('chai').assert;
var barista = require('../index');

describe('barista output.$', function() {

  describe('initialize', function() {
    var styles = `
      .one { background: blue };
      .one.mod { background: red };
    `;
    var output = barista({
      content: styles,
    });

    it('should be included in output as "$"', function() {
      var expect = output.hasOwnProperty('$');
      assert(expect);
    });

    it('should parse rendered CSS using output.$(\'.clasName\') convention', function() {
      var $o = output.$('.one');
      assert($o);
      assert($o.selectors.length);
    });
  });

  describe('create', function() {
    var styles = `
      .one { background: blue };
      .one.mod { background: red };
      .two.mod { background: red };
    `;
    var output = barista({
      content: styles,
    });

    it('should parse with exact matching', function() {
      var $o = output.$('.one');
      assert($o);
      assert.equal($o.selectors.length, 1);
    });

  });

});
