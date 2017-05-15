// Test :: Parser
'use strict';

var assert = require('chai').assert;
var barista = require('../index');

describe('barista output.rule', function() {
  describe('initialize', function() {
    var styles = `
      .one { background: blue };
      .one.mod { background: red };
    `;
    var output = barista({
      content: styles,
    });

    it('should be included in output as "rule"', function() {
      var expect = output.hasOwnProperty('rule');

      assert.isOk(expect);
    });

    it('should parse rendered CSS using output.rule(\'.clasName\') convention', function() {
      var ruleo = output.rule('.one');

      assert(ruleo);
      assert.isOk(ruleo.selectors.length);
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
      var ruleo = output.rule('.nope');

      assert.equal(ruleo.selectors.length, 0);
    });

    it('should parse with exact matching', function() {
      var ruleo = output.rule('.one');

      assert(ruleo.selectors);
      assert.equal(ruleo.selectors.length, 1);
    });

    it('should parse chained classes, e.g ".hello.harry"', function() {
      var ruleo = output.rule('.two.mod');

      assert.equal(ruleo.selectors.length, 1);
    });

    it('should parse complex classes, e.g ".hello > .harry div a:hover"', function() {
      var ruleo = output.rule('.three > div ul > li > a:first-child:hover');

      assert.equal(ruleo.selectors.length, 1);
    });

    it('should reset everytime output.rule() is used', function() {
      output.rule('.one');
      output.rule('.one');
      output.rule('.one');
      var ruled = output.rule('.one.mod');

      assert.equal(ruled.selectors.length, 1);
    });
  });
});
