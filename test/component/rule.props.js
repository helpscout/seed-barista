/* globals barista: true, expect: true, describe: true, it: true, sinon: true */
'use strict';

describe('output.rule', function() {
  describe('getProps', function() {
    var styles = `
      .one { background: blue };
      .one.mod { background: red };
    `;
    var output = barista({
      content: styles,
    });

    it('should return an array of props', function() {
      var ruleo = output.rule('.one');
      var props = ruleo.getProps();

      assert.isOk(Array.isArray(props));
      assert.equal(props.length, 1);
    });

    it('should return an array of simplified props (prop, value)', function() {
      var ruleo = output.rule('.one');
      var props = ruleo.getProps()[0];

      assert.equal(Object.keys(props).length, 2);
      assert.equal(props.prop, 'background');
      assert.equal(props.value, 'blue');
    });

    it('should work with .props() alias', function() {
      var ruleo = output.rule('.one');
      var props = ruleo.props()[0];

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
      var ruleo = output.rule('.one');

      assert.equal(ruleo.getProp('background'), 'blue');
    });

    it('should return false if prop doesn\'t exist', function() {
      var ruleo = output.rule('.one');

      assert.isNotOk(ruleo.getProp('lolol'));
    });

    it('should work with prop() alias', function() {
      var ruleo = output.rule('.one');

      assert.isNotOk(ruleo.prop('lolol'));
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
      var ruleo = output.rule('.one');
      var data = ruleo.getPropData('background');

      assert.isOk(data);
      assert.equal(data.type, 'decl');
      assert.equal(data.prop, 'background');
      assert.equal(data.value, 'blue');
    });

    it('should work with propData() alias', function() {
      var ruleo = output.rule('.one');
      var data = ruleo.propData('background');

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
      var ruleo = output.rule('.one');
      var expect = ruleo.hasProp('background');

      assert.isOk(expect);
    });

    it('should return false if prop doesn\'t exists', function() {
      var ruleo = output.rule('.one');
      var expect = ruleo.hasProp('wut');

      assert.isNotOk(expect);
    });
  });
});
