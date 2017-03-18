// Test :: content
'use strict';

var assert = require('chai').assert;
var barista = require('../index');

describe('barista { options: content }', function() {
  it('should return false if no content is defined', function() {
    var output = barista({ yourawizard: 'harry' });
    assert.equal(output, false);
  });

  it('should return false if option.content is not a string', function() {
    var output = barista({ content: 1 });
    assert.equal(output, false);
  });

  it('should parse CSS from a content defined in options', function() {
    var styles = '.klass { background: blue };';
    var output = barista({
      content: styles,
    });
    var expect = output.css.indexOf('.klass {') >= 0;
    assert.equal(expect, true);
  });

  it('should parse SCSS from a content defined in options', function() {
    var styles = '$class: "hello"; .#{$class}-there { background: blue };';
    var output = barista({
      content: styles,
    });
    var expect = output.css.indexOf('.hello-there') >= 0;
    assert.equal(expect, true);
  });
});
