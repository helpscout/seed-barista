// Test :: Parser
'use strict';

var assert = require('chai').assert;
var barista = require('../index');

describe('barista output.$', function() {

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
