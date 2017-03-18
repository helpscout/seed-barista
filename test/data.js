// Test :: Data
'use strict';

var assert = require('chai').assert;
var barista = require('../index');

describe('barista.order { options: data }', function() {
  it('should return false if no data is defined', function() {
    var output = barista.order({ yourawizard: 'harry' });
    assert.equal(output, false);
  });

  it('should return false if option.data is not a string', function() {
    var output = barista.order({ data: 1 });
    assert.equal(output, false);
  });

  it('should parse CSS from a data defined in options', function() {
    var styles = '.klass { background: blue };';
    var output = barista.order({
      data: styles,
    });
    var expect = output.css.indexOf('.klass {') >= 0;
    assert.equal(expect, true);
  });

  it('should parse SCSS from a data defined in options', function() {
    var styles = '$class: "hello"; .#{$class}-there { background: blue };';
    var output = barista.order({
      data: styles,
    });
    var expect = output.css.indexOf('.hello-there') >= 0;
    assert.equal(expect, true);
  });
});
