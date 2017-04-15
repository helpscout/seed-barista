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

      assert.isOk(expect);
    });

    it('should parse rendered CSS using output.$(\'.clasName\') convention', function() {
      var $o = output.$('.one');

      assert($o);
      assert.isOk($o.selectors.length);
    });
  });

  describe('create', function() {
    var styles = `
      .one { background: blue };
      .one.mod { background: red };
      .two.mod { background: red };
      .three > div ul > li > a:first-child:hover { background: yellow };
    `;
    var output = barista({
      content: styles,
    });

    it('should have no selectors when no matches are found', function() {
      var $o = output.$('.nope');

      assert.equal($o.selectors.length, 0);
    });

    it('should parse with exact matching', function() {
      var $o = output.$('.one');

      assert($o.selectors);
      assert.equal($o.selectors.length, 1);
    });

    it('should parse chained classes, e.g ".hello.harry"', function() {
      var $o = output.$('.two.mod');

      assert.equal($o.selectors.length, 1);
    });

    it('should parse complex classes, e.g ".hello > .harry div a:hover"', function() {
      var $o = output.$('.three > div ul > li > a:first-child:hover');

      assert.equal($o.selectors.length, 1);
    });

    it('should reset everytime output.$() is used', function() {
      var $a = output.$('.one');
      var $b = output.$('.one');
      var $c = output.$('.one');
      var $d = output.$('.one.mod');

      assert.equal($d.selectors.length, 1);
    });
  });
});
