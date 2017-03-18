// Test :: src
'use strict';

var assert = require('chai').assert;
var barista = require('../index');

describe('barista { options: src }', function() {
  it('should return false if defined src is not a string', function() {
    var output = barista({
      file: 'default-src.scss',
      src: true,
    });
    assert.equal(output, false);
  });

  it('should return false if defined src is 0', function() {
    var output = barista({
      file: 'default-src.scss',
      src: 0,
    });
    assert.equal(output, false);
  });

  it('should render files from /test/scss/ by default', function() {
    var output = barista({
      file: 'default-src.scss'
    });
    var expect = output.css.indexOf('.simple') >= 0;
    assert.equal(expect, true);
  });

  it('should render files from custom path if defined', function() {
    var output = barista({
      file: 'custom-path-test.scss',
      src: 'test/custom-path-test/',
    });
    var expect = output.css.indexOf('.simple') >= 0;
    assert.equal(expect, true);
  });
});
