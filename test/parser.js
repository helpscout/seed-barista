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
  });


  describe('getProps', function() {
    var styles = `
      .one { background: blue };
      .one.mod { background: red };
    `;
    var output = barista({
      content: styles,
    });

    it('should return an array of props', function() {
      var $o = output.$('.one');
      var props = $o.getProps();

      assert.isOk(Array.isArray(props));
      assert.equal(props.length, 1);
    });

    it('should return an array of simplified props (prop, value)', function() {
      var $o = output.$('.one');
      var props = $o.getProps()[0];

      assert.equal(Object.keys(props).length, 2);
      assert.equal(props.prop, 'background');
      assert.equal(props.value, 'blue');
    });
  });

  describe('getProp', function() {
    var styles = `
      .one { background: blue };
      .one.mod { background: red };
    `;
    var output = barista({
      content: styles,
    });

    it('should return the prop value of the declarations', function() {
      var $o = output.$('.one');

      assert.equal($o.getProp('background'), 'blue');
    });

    it('should return false if prop doesn\'t exist', function() {
      var $o = output.$('.one');

      assert.isNotOk($o.getProp('lolol'));
    });
  });

  describe('getPropData', function() {
    var styles = `
      .one { background: blue };
      .one.mod { background: red };
    `;
    var output = barista({
      content: styles,
    });

    it('should return PostCSS ATS declaration object of a prop', function() {
      var $o = output.$('.one');
      var data = $o.getPropData('background');

      assert.isOk(data);
      assert.equal(data.type, 'decl');
      assert.equal(data.prop, 'background');
      assert.equal(data.value, 'blue');
    });
  });

  describe('hasProp', function() {
    var styles = `
      .one { background: blue };
      .one.mod { background: red };
    `;
    var output = barista({
      content: styles,
    });

    it('should return true if prop exists', function() {
      var $o = output.$('.one');
      var expect = $o.hasProp('background');

      assert.isOk(expect);
    });

    it('should return false if prop doesn\'t exists', function() {
      var $o = output.$('.one');
      var expect = $o.hasProp('wut');

      assert.isNotOk(expect);
    });
  });
});
